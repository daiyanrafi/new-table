import React from 'react';
import { DetailsList, buildColumns } from '@fluentui/react/lib/DetailsList';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'running':
      return 'green';
    case 'pending':
      return 'orange';
    case 'off':
      return 'red';
    default:
      return 'black';
  }
};

const _onColumnClick = (event, column) => {
  // Handle sorting logic here if needed
  console.log(`Column clicked: ${column.key}`);
};

const App = () => {
  const items = [
    { key: '1', 'Case Title': 'John Doe', 'Case Number': 'Web Developer', status: 'Running', 'Created Date': new Date() },
    { key: '2', 'Case Title': 'Jane Smith', 'Case Number': 'UI Designer', status: 'Pending', 'Created Date': new Date() },
    { key: '3', 'Case Title': 'Bob Johnson', 'Case Number': 'Data Analyst', status: 'Off', 'Created Date': new Date() },
    { key: '4', 'Case Title': 'Alice Brown', 'Case Number': 'Project Manager', status: 'Running', 'Created Date': new Date() },
  ];

  // Add a new column definition for "Created Date"
  const columns = buildColumns(items);
  const createdDateColumn = columns.find(column => column.key === 'createdDate');
  if (createdDateColumn) {
    createdDateColumn.key = 'Created Date';
    createdDateColumn.name = 'Created Date';
  }

  const modifiedColumns = columns.map(column => {
    switch (column.key) {
      case 'CaseTitle':
        return { ...column, key: 'Case Title', name: 'Case Title' };
      case 'caseNumber':
        return { ...column, key: 'Case Number', name: 'Case Number' };
      default:
        return column;
    }
  });

  return (
    <DetailsList
      items={items}
      columns={modifiedColumns}
      onRenderItemColumn={(item, index, column) => {
        const fieldContent = item[column.fieldName];

        switch (column.key) {
          case 'status':
            const statusColor = getStatusColor(fieldContent);
            return (
              <span style={{ color: statusColor }}>
                {fieldContent}
              </span>
            );
          case 'Created Date':
            return <span>{fieldContent.toLocaleString()}</span>;
          default:
            return <span>{fieldContent}</span>;
        }
      }}
      ariaLabelForSelectionColumn="Toggle selection"
      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      checkButtonAriaLabel="select row"
    />
  );
};

export default App;
