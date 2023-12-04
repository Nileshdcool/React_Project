import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import React, { useEffect } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  StyledMenuListWrapper,
  StyledTemplateListMenuItem,
  StyledTemplateListTitleItem,
  StyledTemplatesMenuList,
  StyledTemplatesSelect,
  StyledTemplatesSelectPlaceholderTypography,
  SyledPopper,
  TemplatesListWrapper,
  TemplatesSelectDropDownWrapper,
} from './styledComponents';
import { StyledTemplateSearchInput } from '../styledComponents';
import {
  BUTTONS_TEXT,
  CREATE_NEW_TEMPLATE_MODAL_HEADER,
} from '../../../../../../constants';
import CreateNewTemplateModalView from '../TemplatesSelector/CreateNewTemplateModalView';
import { createTemplate, getTemplates } from '../../../../../../actions/jobDetailsTemplates';
import { selectTemplates } from '../../../../../../selectors/templatesSelect';
import { sortByName } from '../../../../../../utils/sorting';

const chooseEmptyListPlaceholder = (templates) => (templates.length ? 'No results' : 'No templates');
const modifyTemplatesArray = (array) => array && !!array.length && array.map(item => ({ id: item.id, name: item.templateName }));

const DropDownSelectTemplates = ({
  displayEmpty,
  onChange = () => {},
  createNewTemplateModal,
  closeCreateTemplateModal,
  createTemplate,
  lineJobId,
  getTemplates,
  templates,
  selectedTemplate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState('');
  const [templatesList, setTemplatesList] = React.useState('');
  const anchorRef = React.useRef(null);

  useEffect(() => {
    setIsCreateTemplateModalOpen(createNewTemplateModal);
  }, [createNewTemplateModal]);

  useEffect(() => {
    setTemplatesList(modifyTemplatesArray(templates));
  }, [templates]);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = e => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
    setTemplatesList(modifyTemplatesArray(templates));
    onChange(e);
  };

  const onChangeTemplateName = (e) => {
    setTemplateName(e.target.value);
  };

  const onCreateTemplate = async () => {
    const body = { lineJobId, templateName };
    const selectedLineId = localStorage.getItem('SELECTED_LINEJOBS');
    await createTemplate(lineJobId, body).then(() => getTemplates(selectedLineId));
    closeCreateTemplateModal();
  };

  const onTemplateSearch = e => {
    if (e.target.value.length > 0) {
      const filteredTemplates = templates.filter(item =>
        item.templateName.toUpperCase().indexOf(e.target.value.toUpperCase()) + 1);
      setTemplatesList(modifyTemplatesArray(filteredTemplates));
      return;
    }
    if (e.target.value.length === 0) {
      setTemplatesList(modifyTemplatesArray(templates));
    }
  };

  return (
    <TemplatesSelectDropDownWrapper>
      <StyledTemplatesSelect
        onChange={onChange}
        displayEmpty={displayEmpty}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <StyledTemplatesSelectPlaceholderTypography>
          {selectedTemplate}
        </StyledTemplatesSelectPlaceholderTypography>
        <ArrowDropDownIcon />
      </StyledTemplatesSelect>

      <SyledPopper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <StyledMenuListWrapper isTemplate>
                  <StyledTemplateListTitleItem
                    disabled
                  >
                    {selectedTemplate}
                    <ArrowDropUpIcon />
                  </StyledTemplateListTitleItem>
                  <StyledTemplateSearchInput
                    onChange={onTemplateSearch}
                    placeholder="Search by Template"
                    startAdornment={(
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )}
                  />
                  <TemplatesListWrapper>
                    {templatesList.length > 0 ? (
                      <StyledTemplatesMenuList>
                        {sortByName(templatesList).map((item, index) => !item.isStationChoosed && (
                        <StyledTemplateListMenuItem
                          key={`${index}-${item.templateName}`}
                          value={item.id}
                          onClick={handleClose}
                        >
                          {item.name}
                        </StyledTemplateListMenuItem>
                        ))}
                      </StyledTemplatesMenuList>
                    ) : (
                      chooseEmptyListPlaceholder(templates)
                    )}
                  </TemplatesListWrapper>
                </StyledMenuListWrapper>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </SyledPopper>
      <CreateNewTemplateModalView
        open={isCreateTemplateModalOpen}
        buttonsNames={{
          confirmButtonText: BUTTONS_TEXT.create,
          cancelButtonText: BUTTONS_TEXT.cancel,
        }}
        templateName={templateName}
        onChangeTemplateName={onChangeTemplateName}
        onClose={closeCreateTemplateModal}
        headerText={CREATE_NEW_TEMPLATE_MODAL_HEADER}
        onClickCancel={closeCreateTemplateModal}
        onClickConfirm={onCreateTemplate}
      />
    </TemplatesSelectDropDownWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  templates: selectTemplates(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createTemplate,
  getTemplates,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(DropDownSelectTemplates);
