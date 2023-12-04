import React from 'react';
import renderer from 'react-test-renderer';
import FilterPanel from './FilterPanel';

it('+++Correct Snapshot Filter panel', () => {
  const renderedValue = renderer.create(<FilterPanel />).toJSON();
  expect(renderedValue).toMatchInlineSnapshot(`
    <div
      className="sc-AxjAm iBqEbX"
    >
      <div
        className="sc-AxirZ fkNLFQ"
      >
        <button
          className="MuiButtonBase-root MuiIconButton-root sc-AxhCb ezOsjp MuiIconButton-colorPrimary"
          disabled={false}
          iconsize="60px"
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
            className="MuiIconButton-label"
          >
            <svg
              aria-hidden="true"
              className="MuiSvgIcon-root"
              focusable="false"
              role="presentation"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"
              />
            </svg>
          </span>
        </button>
        <button
          className="MuiButtonBase-root MuiIconButton-root sc-AxhCb ezOsjp MuiIconButton-colorPrimary"
          disabled={false}
          iconsize="60px"
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
            className="MuiIconButton-label"
          >
            <svg
              aria-hidden="true"
              className="MuiSvgIcon-root"
              focusable="false"
              role="presentation"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  `);
});
