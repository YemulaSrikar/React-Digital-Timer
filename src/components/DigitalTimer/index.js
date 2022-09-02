// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeInSeconds: 0,
  timeInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onTimerLimitInMinutesDecrement = () => {
    const {timeInMinutes} = this.state

    if (timeInMinutes > 1) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes - 1,
      }))
    }
  }

  onTimerLimitInMinutesIncrement = () =>
    this.setState(prevState => ({
      timeInMinutes: prevState.timeInMinutes + 1,
    }))

  renderTimerLimitControllerSection = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isButtonsDisabled = timeInSeconds > 0

    return (
      <div className="timer-limit-controller-section">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onTimerLimitInMinutesDecrement}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timeInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onTimerLimitInMinutesIncrement}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {isTimerRunning, timeInMinutes, timeInSeconds} = this.state
    const isTimerCompleted = timeInSeconds === timeInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerControllerSection = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const pauseStart = isTimerRunning ? 'Pause' : 'Start'

    return (
      <div className="timer-controller-section">
        <button
          className="timer-controller-btn"
          onClick={this.onClickStartOrPause}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">{pauseStart}</p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onClickReset}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeInMinutes, timeInSeconds} = this.state
    const totalRemainingSeconds = timeInMinutes * 60 - timeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="row-cont">
            <div className="timer-display-section">
              <div className="elapsed-time-container">
                <h1 className="elapsed-time">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="timer-state">{labelText}</p>
              </div>
            </div>
            <div className="controls-section">
              {this.renderTimerControllerSection()}
              {this.renderTimerLimitControllerSection()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
