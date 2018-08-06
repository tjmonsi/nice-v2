import 'polymer/polymer.html'
import './carousel-image.html'

class CarouselImage extends Polymer.Element {
  static get is () { return 'carousel-image' }
  
  static get properties () {
    return {
      selected: {
        type: Object,
        observer: '_selectedChanged'
      }
    };
  }
  
  constructor () {
    super();
    this._boundNext = this.next.bind(this);
  }
  
  connectedCallback() {
    super.connectedCallback();

    this.shadowRoot.addEventListener('slotchange', this._resetSelected.bind(this));
    this._resetSelected();
    this._nextInterval = setInterval(this._boundNext, 10000);
  }
  
  disconnectedCallback () {
    super.disconnectedCallback();
    if (this._nextInterval) {
      clearInterval(this._nextInterval);
      this._nextInterval = null;
    }
  }
  
  ready() {
    super.ready();
    requestAnimationFrame(this._installListeners.bind(this));
  }
  
  _installListeners() {
    this.addEventListener('transitionend', this._resetChildrenStyles.bind(this));
    this.addEventListener('touchstart', this._touchstart.bind(this));
    this.addEventListener('touchmove', this._touchmove.bind(this));
    this.addEventListener('touchend', this._touchend.bind(this));
  }
  
  _resetChildrenStyles() {
    let elem = this.firstElementChild;
    while (elem) {
      elem.style.display = '';
      elem.style.transition = '';
      elem.style.transform = '';
      elem = elem.nextElementSibling;
    }
  }

  _selectedChanged(selected, oldSelected) {
    if (oldSelected) oldSelected.removeAttribute('selected');
    if (selected) selected.setAttribute('selected', '');
  
    if (selected) {
      this.$.prevBtn.disabled = !selected.previousElementSibling;
      this.$.nextBtn.disabled = !selected.nextElementSibling;
    } else {
      this.$.prevBtn.disabled = true;
      this.$.nextBtn.disabled = true;
    }
  }

  _resetSelected() {
    if (!this.selected || this.selected.parentElement !== this) {
      this.selected = this.firstElementChild;
    }
  }
  
  previous() {
    const elem = this.selected && this.selected.previousElementSibling;
    if (elem && !this._touchDir) {
      // Setup transition start state
      const oldSelected = this.selected;
      this._translateX(oldSelected, 0);
      this._translateX(elem, -this.offsetWidth);
  
      // Start the transition
      this.selected = elem;
      this._translateX(oldSelected, this.offsetWidth, true /* transition */);
      this._translateX(elem, 0, true /* transition */);
    }
  }
  
  next() {
    const elem = this.selected && this.selected.nextElementSibling;
    if (elem && !this._touchDir) {
      // Setup transition start state
      const oldSelected = this.selected;
      this._translateX(oldSelected, 0);
      this._translateX(elem, this.offsetWidth);
  
      // Start the transition
      this.selected = elem;
      this._translateX(oldSelected, -this.offsetWidth, true /* transition */);
      this._translateX(elem, 0, true /* transition */);
    } else {
      const oldSelected = this.selected;
      this._translateX(oldSelected, 0);
      this._translateX(this.firstElementChild, this.offsetWidth);
      
      this.selected = this.firstElementChild;
      this._translateX(oldSelected, -this.offsetWidth, true /* transition */);
      this._translateX(this.firstElementChild, 0, true /* transition */);
    }
  }
  
  _translateX(elem, x, transition) {
    elem.style.display = 'block';
    elem.style.transition = transition ? 'transform 0.2s' : '';
    elem.style.transform = 'translate3d(' + x + 'px, 0, 0)';
  }
  
  _touchstart(event) {
    // No transition if less than two images
    if (this.childElementCount < 2) {
      return;
    }
    
    // Save start coordinates
    if (!this._touchDir) {
      this._startX = event.changedTouches[0].clientX;
      this._startY = event.changedTouches[0].clientY;
    }
  }
  
  _touchmove(event) {
    // No transition if less than two images
    if (this.childElementCount < 2) {
      return;
    }
    
    // Is touchmove mostly horizontal or vertical?
    if (!this._touchDir) {
      const absX = Math.abs(event.changedTouches[0].clientX - this._startX);
      const absY = Math.abs(event.changedTouches[0].clientY - this._startY);
      this._touchDir = absX > absY ? 'x' : 'y';
    }
  
    if (this._touchDir === 'x') {
      // Prevent vertically scrolling when swiping
      event.preventDefault();
    }
    
    if (this._touchDir === 'x') {
      // Prevent vertically scrolling when swiping
      event.preventDefault();
  
      let dx = Math.round(event.changedTouches[0].clientX - this._startX);
      const prevChild = this.selected.previousElementSibling;
      const nextChild = this.selected.nextElementSibling;
  
      // Don't translate past the current image if there's no adjacent image in that direction
      if ((!prevChild && dx > 0) || (!nextChild && dx < 0)) {
        dx = 0;
      }
  
      this._translateX(this.selected, dx);
      if (prevChild) {
        this._translateX(prevChild, dx - this.offsetWidth);
      }
      if (nextChild) {
        this._translateX(nextChild, dx + this.offsetWidth);
      }
    }
  }
  
  _touchend(event) {
    // No transition if less than two images
    if (this.childElementCount < 2) {
      return;
    }
  
    // Don't finish swiping if there are still active touches.
    if (event.touches.length) {
      return;
    }
  
    if (this._touchDir === 'x') {
      let dx = Math.round(event.changedTouches[0].clientX - this._startX);
      const prevChild = this.selected.previousElementSibling;
      const nextChild = this.selected.nextElementSibling;
  
      // Don't translate past the current image if there's no adjacent image in that direction
      if ((!prevChild && dx > 0) || (!nextChild && dx < 0)) {
        dx = 0;
      }
  
      if (dx > 0) {
        if (dx > 100) {
          if (dx === this.offsetWidth) {
            // No transitionend will fire (since we're already in the final state),
            // so reset children styles now
            this._resetChildrenStyles();
          } else {
            this._translateX(prevChild, 0, true);
            this._translateX(this.selected, this.offsetWidth, true);
          }
          this.selected = prevChild;
        } else {
          this._translateX(prevChild, -this.offsetWidth, true);
          this._translateX(this.selected, 0, true);
        }
      } else if (dx < 0) {
        if (dx < -100) {
          if (dx === -this.offsetWidth) {
            // No transitionend will fire (since we're already in the final state),
            // so reset children styles now
            this._resetChildrenStyles();
          } else {
            this._translateX(this.selected, -this.offsetWidth, true);
            this._translateX(nextChild, 0, true);
          }
          this.selected = nextChild;
        } else {
          this._translateX(this.selected, 0, true);
          this._translateX(nextChild, this.offsetWidth, true);
        }
      } else {
        // No transitionend will fire (since we're already in the final state),
        // so reset children styles now
        this._resetChildrenStyles();
      }
    }
  
    // Reset touch direction
    this._touchDir = null;
  }
}

customElements.define(CarouselImage.is, CarouselImage)