import React from 'react';
import renderer from 'react-test-renderer';
import { DragDropContext } from 'react-beautiful-dnd';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { mount, configure } from 'enzyme';
import { TileJobLine } from './components/TileJobLine';
import { Label } from '../../../components/Label/Label';

configure({ adapter: new Adapter() });

describe('>>> Tile components', () => {
  const item = { id: 'newJobs', title: 'NEW JOBS' };
  const filteredJobs = [
    {
      so: '92049152',
      queuePosition: 'newJobs',
      revisionNumber: null,
      status: 'WAITING',
      units: {
        scheduled: 14,
        completed: 0,
      },
      workData: {
        wo: '8430956',
        customer: 'GREAT SOUTHERN TECHNOLOGIES',
        description: 'RTW-10,BRN',
        startDate: '04/25/2020',
        completitionDate: '05/09/2020',
      },
    },
    {
      so: '92049154',
      queuePosition: 'newJobs',
      revisionNumber: null,
      status: 'DWGS REL',
      units: {
        scheduled: 13,
        completed: 0,
      },
      workData: {
        wo: '8430959',
        customer: 'LUMMUS TECHNOLOGY INC',
        description: 'PLSFFR-60M. BRN OPP 9206750',
        startDate: '05/09/2020',
        completitionDate: '05/23/2020',
      },
    },
    {
      so: '92049140',
      queuePosition: 'newJobs',
      revisionNumber: 2,
      status: 'ALLOCATED',
      units: {
        scheduled: 12,
        completed: 0,
      },
      workData: {
        wo: '8430952',
        customer: 'TECHNIP USA INC',
        description: 'COOLSTAR-15-ARIA G-1021A, G-1021B',
        startDate: '04/11/2020',
        completitionDate: '04/25/2020',
      },
    },
  ];
  const component = (
    <DragDropContext onDragEnd={() => {}}>
      <TileJobLine
        title={item.title}
        id={item.id}
        key={item.id}
        jobs={filteredJobs}
      />
    </DragDropContext>
  );
  it('+++Correct Snapshot of TileJobCard with jobData', () => {
    const renderedValue = renderer.create(component).toJSON();
    expect(renderedValue).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        box-shadow: none;
        outline: 1px solid #707070;
        border-radius: 0;
        background-color: #cecece;
        margin-left: 10px;
        padding: 0;
      }

      .c0.MuiPaper-rounded {
        border-radius: 0;
      }

      .c0:first-child {
        margin-left: 0;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        padding: 12px 20px;
        background-color: #07639c;
        color: #ffffff;
        text-align: left;
      }

      .c2 {
        background-color: #cecece;
        padding: 10px;
        overflow-y: auto;
      }

      .c3 {
        position: relative;
        border-radius: 0;
        box-shadow: none;
        padding: 10px 10px 10px 15px;
        margin-bottom: 10px;
        border: solid 1px #707070;
        background-color: #ffffff;
      }

      .c3.MuiPaper-rounded {
        border-radius: 0;
      }

      .c3 .MuiCardHeader-root {
        padding: 0px;
        padding-bottom: 7px;
        text-align: left;
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-flex-flow: row-reverse;
        -ms-flex-flow: row-reverse;
        flex-flow: row-reverse;
        border-bottom: 1px solid #707070;
      }

      .c3 .MuiCardHeader-action {
        margin: 0;
        margin-left: -6px;
      }

      .c9 {
        position: absolute;
        top: 8px;
        right: 10px;
        outline: solid 1px #707070;
      }

      .c9.MuiPaper-rounded {
        border-radius: 0;
      }

      .c9 .MuiCardHeader-root {
        padding: 3px 5px;
        text-align: start;
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        background-color: #06639c;
      }

      .c9 .MuiCardContent-root {
        padding: 5px 7px;
      }

      .c5 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        visibility: visible;
      }

      .c6 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 21px;
        -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0px 12px;
        font-size: 10px;
        line-height: 1.1;
        border-radius: 10px;
        background-color: #ff6700;
        color: white;
      }

      .c16 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 21px;
        -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0px 12px;
        font-size: 10px;
        line-height: 1.1;
        border-radius: 10px;
        background-color: #7f379b;
        color: white;
      }

      .c4 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c4 h4 {
        margin-right: 17px;
      }

      .c13 {
        text-align: left;
        padding: 10px 0;
      }

      .c14 {
        margin-bottom: 12px;
        margin-right: 20px;
      }

      .c11 {
        margin: 0;
      }

      .c12 {
        background: #707070;
        height: 20px;
        margin: 4px 4px 0 4px;
      }

      .c10 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c15 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }

      .c7 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: -webkit-grab;
        cursor: -moz-grab;
        cursor: grab;
      }

      .c17 {
        height: 30px;
        background-image: linear-gradient(to bottom,#93c6f4,#064289);
      }

      .c17.MuiButton-contained:hover {
        background-image: linear-gradient(to bottom,#0679c5,#064289);
      }

      .c17.MuiButton-containedPrimary {
        border: solid 1px #707070;
      }

      .c17.MuiButton-containedSecondary {
        border: solid 1px #425a70;
      }

      .c8.MuiIconButton-root {
        padding: 0;
        color: #425a70;
      }

      .c8.MuiIconButton-root svg {
        font-size: 24px;
      }

      <div
        className="MuiPaper-root c0 MuiPaper-elevation1 MuiPaper-rounded"
      >
        <div
          className="c1"
        >
          <h2
            className="MuiTypography-root MuiTypography-h2"
          >
            NEW JOBS
          </h2>
        </div>
        <div
          className="c2"
          data-rbd-droppable-context-id="0"
          data-rbd-droppable-id="newJobs"
        >
          <div
            className="MuiPaper-root MuiCard-root c3 MuiPaper-elevation0 MuiPaper-rounded"
            data-rbd-draggable-context-id="0"
            data-rbd-draggable-id="92049140"
            id="92049140"
            onTransitionEnd={null}
            style={
              Object {
                "transform": null,
                "transition": null,
              }
            }
          >
            <div
              className="MuiCardHeader-root"
            >
              <div
                className="MuiCardHeader-content"
              >
                <span
                  className="MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock"
                >
                  <div
                    className="c4"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      92049140
                    </h4>
                    <div
                      className="c5"
                    >
                      <div
                        className="c6"
                        color="orange"
                      >
                        Revision#: 2
                      </div>
                    </div>
                  </div>
                </span>
              </div>
              <div
                className="MuiCardHeader-action"
              >
                <div
                  aria-describedby="rbd-hidden-text-0-hidden-text-0"
                  className="c7"
                  data-rbd-drag-handle-context-id="0"
                  data-rbd-drag-handle-draggable-id="92049140"
                  draggable={false}
                  onDragStart={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  <span
                    aria-hidden={true}
                    className="material-icons MuiIcon-root c8"
                    iconcolor="#425a70"
                    iconsize="24px"
                  >
                    <svg
                      aria-hidden="true"
                      className="MuiSvgIcon-root"
                      focusable="false"
                      role="presentation"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="MuiPaper-root MuiCard-root c9 MuiPaper-elevation0 MuiPaper-rounded"
            >
              <div
                className="MuiCardHeader-root"
              >
                <div
                  className="MuiCardHeader-content"
                >
                  <h6
                    className="MuiTypography-root MuiTypography-h6"
                  >
                    UNITS
                  </h6>
                </div>
              </div>
              <div
                className="MuiCardContent-root"
              >
                <div
                  className="c10"
                >
                  <div
                    className="c11"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      12
                    </h4>
                    <h5
                      className="MuiTypography-root MuiTypography-h5"
                    >
                      Scheduled
                    </h5>
                  </div>
                  <hr
                    className="MuiDivider-root c12 MuiDivider-flexItem MuiDivider-vertical"
                  />
                  <div
                    className="c11"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      0
                    </h4>
                    <h5
                      className="MuiTypography-root MuiTypography-h5"
                    >
                      Completed
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="MuiCardContent-root c13"
            >
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Work Order
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  8430952
                </h6>
              </div>
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Customer
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  TECHNIP USA INC
                </h6>
              </div>
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Description
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  COOLSTAR-15-ARIA G-1021A, G-1021B
                </h6>
              </div>
              <div
                className="c10"
              >
                <div
                  className="c14"
                >
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                  >
                    Planned Start
                  </h5>
                  <h6
                    className="MuiTypography-root MuiTypography-subtitle1"
                  >
                    04/11/2020
                  </h6>
                </div>
                <div
                  className="c14"
                >
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                  >
                    Planned Completion
                  </h5>
                  <h6
                    className="MuiTypography-root MuiTypography-subtitle1"
                  >
                    04/25/2020
                  </h6>
                </div>
              </div>
            </div>
            <div
              className="c15"
            >
              <div
                className="c5"
              >
                <div
                  className="c16"
                  color="purple"
                >
                  ALLOCATED
                </div>
              </div>
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained c17 MuiButton-containedPrimary"
                colortype="classic"
                disabled={false}
                onBlur={[Function]}
                onClick={[Function]}
                onDragLeave={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                onKeyUp={[Function]}
                onMouseDown={[Function]}
                onMouseLeave={[Function]}
                onMouseUp={[Function]}
                onTouchEnd={[Function]}
                onTouchMove={[Function]}
                onTouchStart={[Function]}
                tabIndex={0}
                type="button"
              >
                <span
                  className="MuiButton-label"
                >
                  EDIT
                </span>
              </button>
            </div>
          </div>
          <div
            className="MuiPaper-root MuiCard-root c3 MuiPaper-elevation0 MuiPaper-rounded"
            data-rbd-draggable-context-id="0"
            data-rbd-draggable-id="92049152"
            id="92049152"
            onTransitionEnd={null}
            style={
              Object {
                "transform": null,
                "transition": null,
              }
            }
          >
            <div
              className="MuiCardHeader-root"
            >
              <div
                className="MuiCardHeader-content"
              >
                <span
                  className="MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock"
                >
                  <div
                    className="c4"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      92049152
                    </h4>
                  </div>
                </span>
              </div>
              <div
                className="MuiCardHeader-action"
              >
                <div
                  aria-describedby="rbd-hidden-text-0-hidden-text-0"
                  className="c7"
                  data-rbd-drag-handle-context-id="0"
                  data-rbd-drag-handle-draggable-id="92049152"
                  draggable={false}
                  onDragStart={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  <span
                    aria-hidden={true}
                    className="material-icons MuiIcon-root c8"
                    iconcolor="#425a70"
                    iconsize="24px"
                  >
                    <svg
                      aria-hidden="true"
                      className="MuiSvgIcon-root"
                      focusable="false"
                      role="presentation"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="MuiPaper-root MuiCard-root c9 MuiPaper-elevation0 MuiPaper-rounded"
            >
              <div
                className="MuiCardHeader-root"
              >
                <div
                  className="MuiCardHeader-content"
                >
                  <h6
                    className="MuiTypography-root MuiTypography-h6"
                  >
                    UNITS
                  </h6>
                </div>
              </div>
              <div
                className="MuiCardContent-root"
              >
                <div
                  className="c10"
                >
                  <div
                    className="c11"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      14
                    </h4>
                    <h5
                      className="MuiTypography-root MuiTypography-h5"
                    >
                      Scheduled
                    </h5>
                  </div>
                  <hr
                    className="MuiDivider-root c12 MuiDivider-flexItem MuiDivider-vertical"
                  />
                  <div
                    className="c11"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      0
                    </h4>
                    <h5
                      className="MuiTypography-root MuiTypography-h5"
                    >
                      Completed
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="MuiCardContent-root c13"
            >
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Work Order
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  8430956
                </h6>
              </div>
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Customer
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  GREAT SOUTHERN TECHNOLOGIES
                </h6>
              </div>
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Description
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  RTW-10,BRN
                </h6>
              </div>
              <div
                className="c10"
              >
                <div
                  className="c14"
                >
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                  >
                    Planned Start
                  </h5>
                  <h6
                    className="MuiTypography-root MuiTypography-subtitle1"
                  >
                    04/25/2020
                  </h6>
                </div>
                <div
                  className="c14"
                >
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                  >
                    Planned Completion
                  </h5>
                  <h6
                    className="MuiTypography-root MuiTypography-subtitle1"
                  >
                    05/09/2020
                  </h6>
                </div>
              </div>
            </div>
            <div
              className="c15"
            >
              <div
                className="c5"
              >
                <div
                  className="c16"
                  color="purple"
                >
                  WAITING
                </div>
              </div>
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained c17 MuiButton-containedPrimary"
                colortype="classic"
                disabled={false}
                onBlur={[Function]}
                onClick={[Function]}
                onDragLeave={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                onKeyUp={[Function]}
                onMouseDown={[Function]}
                onMouseLeave={[Function]}
                onMouseUp={[Function]}
                onTouchEnd={[Function]}
                onTouchMove={[Function]}
                onTouchStart={[Function]}
                tabIndex={0}
                type="button"
              >
                <span
                  className="MuiButton-label"
                >
                  EDIT
                </span>
              </button>
            </div>
          </div>
          <div
            className="MuiPaper-root MuiCard-root c3 MuiPaper-elevation0 MuiPaper-rounded"
            data-rbd-draggable-context-id="0"
            data-rbd-draggable-id="92049154"
            id="92049154"
            onTransitionEnd={null}
            style={
              Object {
                "transform": null,
                "transition": null,
              }
            }
          >
            <div
              className="MuiCardHeader-root"
            >
              <div
                className="MuiCardHeader-content"
              >
                <span
                  className="MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock"
                >
                  <div
                    className="c4"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      92049154
                    </h4>
                  </div>
                </span>
              </div>
              <div
                className="MuiCardHeader-action"
              >
                <div
                  aria-describedby="rbd-hidden-text-0-hidden-text-0"
                  className="c7"
                  data-rbd-drag-handle-context-id="0"
                  data-rbd-drag-handle-draggable-id="92049154"
                  draggable={false}
                  onDragStart={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  <span
                    aria-hidden={true}
                    className="material-icons MuiIcon-root c8"
                    iconcolor="#425a70"
                    iconsize="24px"
                  >
                    <svg
                      aria-hidden="true"
                      className="MuiSvgIcon-root"
                      focusable="false"
                      role="presentation"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="MuiPaper-root MuiCard-root c9 MuiPaper-elevation0 MuiPaper-rounded"
            >
              <div
                className="MuiCardHeader-root"
              >
                <div
                  className="MuiCardHeader-content"
                >
                  <h6
                    className="MuiTypography-root MuiTypography-h6"
                  >
                    UNITS
                  </h6>
                </div>
              </div>
              <div
                className="MuiCardContent-root"
              >
                <div
                  className="c10"
                >
                  <div
                    className="c11"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      13
                    </h4>
                    <h5
                      className="MuiTypography-root MuiTypography-h5"
                    >
                      Scheduled
                    </h5>
                  </div>
                  <hr
                    className="MuiDivider-root c12 MuiDivider-flexItem MuiDivider-vertical"
                  />
                  <div
                    className="c11"
                  >
                    <h4
                      className="MuiTypography-root MuiTypography-h4"
                    >
                      0
                    </h4>
                    <h5
                      className="MuiTypography-root MuiTypography-h5"
                    >
                      Completed
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="MuiCardContent-root c13"
            >
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Work Order
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  8430959
                </h6>
              </div>
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Customer
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  LUMMUS TECHNOLOGY INC
                </h6>
              </div>
              <div
                className="c14"
              >
                <h5
                  className="MuiTypography-root MuiTypography-h5"
                >
                  Description
                </h5>
                <h6
                  className="MuiTypography-root MuiTypography-subtitle1"
                >
                  PLSFFR-60M. BRN OPP 9206750
                </h6>
              </div>
              <div
                className="c10"
              >
                <div
                  className="c14"
                >
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                  >
                    Planned Start
                  </h5>
                  <h6
                    className="MuiTypography-root MuiTypography-subtitle1"
                  >
                    05/09/2020
                  </h6>
                </div>
                <div
                  className="c14"
                >
                  <h5
                    className="MuiTypography-root MuiTypography-h5"
                  >
                    Planned Completion
                  </h5>
                  <h6
                    className="MuiTypography-root MuiTypography-subtitle1"
                  >
                    05/23/2020
                  </h6>
                </div>
              </div>
            </div>
            <div
              className="c15"
            >
              <div
                className="c5"
              >
                <div
                  className="c16"
                  color="purple"
                >
                  DWGS REL
                </div>
              </div>
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained c17 MuiButton-containedPrimary"
                colortype="classic"
                disabled={false}
                onBlur={[Function]}
                onClick={[Function]}
                onDragLeave={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                onKeyUp={[Function]}
                onMouseDown={[Function]}
                onMouseLeave={[Function]}
                onMouseUp={[Function]}
                onTouchEnd={[Function]}
                onTouchMove={[Function]}
                onTouchStart={[Function]}
                tabIndex={0}
                type="button"
              >
                <span
                  className="MuiButton-label"
                >
                  EDIT
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});

describe('>>> Label components', () => {
  it('Label snapshot with params', () => {
    const wrapper = renderer
      .create(<Label text="Revision#: 3" color="purple" />)
      .toJSON();
    expect(wrapper).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        visibility: visible;
      }

      .c1 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 21px;
        -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0px 12px;
        font-size: 10px;
        line-height: 1.1;
        border-radius: 10px;
        background-color: #7f379b;
        color: white;
      }

      <div
        className="c0"
      >
        <div
          className="c1"
          color="purple"
        >
          Revision#: 3
        </div>
      </div>
    `);
  });
  it('should have border-radius 10px background-color #7f379b when color is purple', () => {
    const component = mount(<Label text="Revision#: 3" color="purple" />);
    expect(component.find('div[children="Revision#: 3"]')).toHaveStyleRule(
      'background-color',
      '#7f379b',
    );
    expect(component.find('div[children="Revision#: 3"]')).toHaveStyleRule(
      'border-radius',
      '10px',
    );
  });
  it('should have border-radius 10px background-color #ff6700 when color is orange', () => {
    const component = mount(<Label text="Revision#: 3" color="purple" />);
    expect(component.find('div[children="Revision#: 3"]')).toHaveStyleRule(
      'background-color',
      '#ff6700',
    );
    expect(component.find('div[children="Revision#: 3"]')).toHaveStyleRule(
      'border-radius',
      '10px',
    );
  });
  it('Label should be hidden', () => {
    const component = mount(
      <Label isLabelHide text="ALLOCATED" color="purple" />,
    );
    expect(component.find('div')).toHaveLength(2);
    expect(component.find('div')).toHaveStyleRule('visibility', 'hidden');
  });
  it('Label should have border-radius 2px background-color #0a952a', () => {
    const status = 'IN-PROGRESS';
    const isStatusInProgress = status === 'IN-PROGRESS';
    const component = mount(
      <Label text={status} color="green" squareLabel={isStatusInProgress} />,
    );
    expect(component.find('div[children="IN-PROGRESS"]')).toHaveStyleRule(
      'background-color',
      '#0a952a',
    );
    expect(component.find('div[children="IN-PROGRESS"]')).toHaveStyleRule(
      'border-radius',
      '2px',
    );
  });
});
