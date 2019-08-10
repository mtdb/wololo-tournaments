import Fade from '@material-ui/core/Fade';
import MaterialModal from '@material-ui/core/Modal';
import React from 'react';
import './Modal.scss';

interface IProps {
  children: any;
  onClose: () => void;
  open: boolean;
}

// https://codepen.io/jmeester/pen/rmGaGZ
export const Modal = ({ children, open, onClose }: IProps) => {
  // const [count, setCount] = useState(0);
  // const [isOpen, setOpen] = useState(open);
  // const openRef = useRef(open);
  // openRef.current = open;

  return (
    <MaterialModal
      closeAfterTransition={true}
      className="main-modal"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onBackdropClick={onClose}
    >
      <Fade in={open}>
        <div className="c-body">
          <main className="c-main">
            <div className={`l-scroll ${open ? 'ready' : ''}`}>
              <div className="c-scroll" onClick={onClose}>
                <div className="c-scroll__holder c-scroll__holder--top">
                  <div className="c-scroll__knob">
                    <div className="c-scroll__knob c-scroll__knob--small c-scroll__knob--left" />
                  </div>
                  <div className="c-scroll__roll c-scroll__roll--top" />
                  <div className="c-scroll__knob">
                    <div className="c-scroll__knob c-scroll__knob--small c-scroll__knob--right" />
                  </div>
                </div>
                <div className="c-scroll__paper">
                  <div className="c-scroll__content">
                    <button className="close" onClick={onClose}>
                      X
                    </button>
                    {children}
                  </div>
                </div>
                <div className="c-scroll__holder c-scroll__holder--bottom" onClick={onClose}>
                  <div className="c-scroll__knob">
                    <div className="c-scroll__knob c-scroll__knob--small c-scroll__knob--left" />
                  </div>
                  <div className="c-scroll__roll c-scroll__roll--bottom" />
                  <div className="c-scroll__knob">
                    <div className="c-scroll__knob c-scroll__knob--small c-scroll__knob--right" />
                  </div>
                </div>
              </div>
            </div>
            <div className={`c-candle ${open ? 'ready' : ''}`} onClick={onClose}>
              <div className="c-flame">
                <div className="c-flame__shadows" />
                <div className="c-flame__top" />
                <div className="c-flame__middle" />
                <div className="c-flame__bottom" />
              </div>
              <div className="c-candle__wick" />
              <div className="c-candle__wax" />
            </div>
          </main>
        </div>
      </Fade>
    </MaterialModal>
  );
};
