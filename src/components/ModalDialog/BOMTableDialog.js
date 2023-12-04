import DialogContentText from '@material-ui/core/DialogContentText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import sortBy from 'lodash/sortBy';
import React from 'react';

import { BOM_HEADER_CELLS } from '../../constants/index';
import ContainedButton from '../Buttons/ContainedButton';
import CustomIconButton from '../Buttons/CustomIconButton';
import AnnotationDialog from './AnnotationDialog';
import {
  BOMButtonWrapper,
  BOMDialogTitle,
  BOMIcons,
  BOMNameTitle,
  Close,
  ConfirmationDialogContent,
  HeaderCell,
  ItemCellWrapper,
  StyledBOMDialog,
  StyledCell,
  TextCutter,
  Triangle,
} from './styledComponents';

const BOMTableDialog = ({
  open,
  isSupervisorTable,
  onClose,
  headerText,
  bodyItems,
  buttonName,
  bomModalId,
  selectedValue,
  onChangeItem,
  onChangeAnnotation,
  saveAnnotation,
  annotationText,
  removeAnnotation,
  savedChangesInAnnotations,
  toggleAnnotationModal,
  openAnnotationModal,
  onDiscardAnnotation,
  bomModalSize,
  isDisabled,
  isOperatorViewBoms,
  bomPartNumber,
}) => (
      <StyledBOMDialog
        open={open}
        onClose={onClose}
        width={`${bomModalSize.width}px`}
        height={`${bomModalSize.height}px`}
        isOperatorViewBoms={isOperatorViewBoms}
      >
        <BOMDialogTitle className="handle" disableTypography>
          <BOMNameTitle variant="h4">
            {`${bomPartNumber} - ${headerText}`}
          </BOMNameTitle>
          <BOMButtonWrapper isOperatorViewBoms={isOperatorViewBoms}>
            {!isOperatorViewBoms && (
              <ContainedButton
                variant="contained"
                color="primary"
                colorType="classic"
                onClick={() => toggleAnnotationModal(
                  sortBy(bodyItems
                    .filter(bom => (isSupervisorTable ? bom.isCheckedForStation : !bom.isDeleted))
                    .filter(bom => bom.parentId === bomModalId), 'number')[0],
                )}
                text={buttonName}
              />
            )}
            <BOMIcons>
              <CustomIconButton
                disableRipple
                onClick={onClose}
                icon={<Close />}
                iconFontSize="20px"
              />
            </BOMIcons>
          </BOMButtonWrapper>
        </BOMDialogTitle>
        <ConfirmationDialogContent isOperatorViewBoms={isOperatorViewBoms}>
          <DialogContentText>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {BOM_HEADER_CELLS.map(cell => (
                      <HeaderCell
                        minwidth={cell.styleCell}
                        align={cell.textAlign}
                        key={cell.title}
                      >
                        {cell.title}
                      </HeaderCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortBy(bodyItems
                    .filter(bom => (isSupervisorTable ? bom.isCheckedForStation : !bom.isDeleted))
                    .filter(bom => bom.parentId === bomModalId), 'number').map((item, i) => (
                      <TableRow key={item.id}>
                        <StyledCell align="left" onClick={() => item.annotation && toggleAnnotationModal(item, true)}>
                          <ItemCellWrapper isAnnotated={!!item.annotation}>
                            <TextCutter>{item.number}</TextCutter>
                            {item.annotation ? <Triangle /> : null}
                          </ItemCellWrapper>
                        </StyledCell>
                        <StyledCell align="left">{item.part.drawing && item.part.drawing.fileName}</StyledCell>
                        <StyledCell align="left">{item.part.tagNo}</StyledCell>
                        <StyledCell align="center">{item.part.numberOfPieces}</StyledCell>
                        <StyledCell align="center">{item.part.totalPieces}</StyledCell>
                        <StyledCell align="left">{item.part.description}</StyledCell>
                        <StyledCell align="left">{item.part.dimension}</StyledCell>
                        <StyledCell align="left">{item.part.manufacturingNotes}</StyledCell>
                        <StyledCell align="center">{item.part.perDrawingSpec}</StyledCell>
                        <StyledCell align="center">{item.part.number}</StyledCell>
                        <StyledCell align="center">{item.part.makeOrBuy.name}</StyledCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </ConfirmationDialogContent>
        <AnnotationDialog
          isOperatorViewBoms={isOperatorViewBoms}
          open={openAnnotationModal}
          buttonsNames={{
            confirmButtonText: 'ADD',
            deleteButtonText: 'DELETE',
          }}
          isSupervisorTable={isSupervisorTable}
          onClose={toggleAnnotationModal}
          bomModalId={bomModalId}
          bodyItems={bodyItems}
          selectedValue={selectedValue}
          annotationText={annotationText}
          onChangeItem={onChangeItem}
          onChangeAnnotation={onChangeAnnotation}
          saveAnnotation={saveAnnotation}
          removeAnnotation={removeAnnotation}
          savedChangesInAnnotations={savedChangesInAnnotations || isOperatorViewBoms}
          onDiscardAnnotation={onDiscardAnnotation}
          isDisabled={isDisabled}
        />
      </StyledBOMDialog>
);

export default BOMTableDialog;
