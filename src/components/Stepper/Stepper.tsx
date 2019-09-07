import React, { Component } from 'react';
import './Stepper.scss';

interface IStep {
  disabled?: boolean;
  name: string;
  status: string;
}
interface IProps {
  active: number;
  steps: IStep[];
  onChange: (active: number) => () => void;
}
interface IState {
  completed: boolean;
}

enum Roman {
  I,
  II,
  III,
  IV
}

class Stepper extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      completed: props.active + 1 >= props.steps.length
    };
  }

  // public componentDidUpdate(): void {
  //   const { active, steps } = this.props;
  //   if (active + 1 >= steps.length) {
  //     setTimeout(() => {
  //       this.setState({ completed: true });
  //     }, 1000);
  //   } else if (this.state.completed) {
  //     this.setState({ completed: false });
  //   }
  // }

  public render(): JSX.Element {
    const { active, steps, onChange } = this.props;
    // const completed = this.state.completed ? 'completed' : '';
    const progress = (100.0 / (steps.length - 1)) * active;
    // const stage = `step${step} ${completed}`;
    const lineSize = 100.0 / (steps.length - 1);
    const ballOffset = 20 / (steps.length - 1);
    return (
      <div className="stepper-wrapper">
        <div className="admin-wrapper">
          <div className={`stepper `}>
            <div className="line line1">
              <div className="fill" style={{ width: `${progress}%` }} />
            </div>
            <div
              className="ball-wrapper"
              style={{
                transform: `translateX(${100 * active}%)`,
                width: `calc(${lineSize}% - var(--apx) * ${ballOffset})`
              }}
            >
              <div
                className="ball"
                style={{
                  transform: `rotateZ(${360 * active}deg)`
                }}
              />
            </div>

            {steps.map((step, index) => (
              <button
                id={`step${index}`}
                key={`step${index}`}
                className={`circle circle${index} ${step.status} ${
                  step.disabled ? 'disabled' : ''
                } ${active === index ? 'active' : ''}`}
                onClick={onChange(index)}
                disabled={!!step.disabled}
              >
                <div>{Roman[index]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
// <div className="flag" />

export { Stepper };
