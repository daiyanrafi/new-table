import React from 'react';
import { DetailsList, buildColumns } from '@fluentui/react/lib/DetailsList';

const App = () => {
  const items = [
    { key: '1', CaseTitle: 'John Doe', caseNumber: 'Web Developer', status: 'Running' },
    { key: '2', CaseTitle: 'Jane Smith', caseNumber: 'UI Designer', status: 'Pending' },
    { key: '3', CaseTitle: 'Bob Johnson', caseNumber: 'Data Analyst', status: 'Off' },
    { key: '4', CaseTitle: 'Bob Johnson', caseNumber: 'Data Analyst', status: 'Off' },
  ];

  const columns = buildColumns(items); // Pass the items array to buildColumns

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

  return (
    <DetailsList
      items={items}
      columns={columns}
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
