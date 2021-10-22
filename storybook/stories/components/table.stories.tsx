import React from "react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";
import "@availity/mock";
import "@availity/table/styles.scss";
import Table, {
  ActionCell,
  BadgeCell,
  DateCell,
  ScrollableContainer
} from "@availity/table";
import README from "@availity/table/README.md";
import response from "@availity/mock/data/patients.json";
import { Preview } from "../util";

const columns = [
  {
    Header: "First Name",
    accessor: "firstName",
    defaultCanSort: true,
    disableSortBy: false
  },
  {
    Header: "Last Name",
    accessor: "lastName",
    defaultCanSort: true,
    disableSortBy: false
  },
  {
    Header: "Birth Date",
    accessor: "birthDate",
    defaultCanSort: true,
    disableSortBy: false,
    Cell: DateCell({ dateFormat: "MM/DD/yyyy" })
  },
  {
    Header: "Subscriber Relationship",
    accessor: "subscriberRelationship",
    defaultCanSort: true,
    disableSortBy: false,
    Cell: BadgeCell("primary")
  },
  {
    id: "actions",
    Header: "Actions",
    className: "action-column",
    Cell: ActionCell({
      actions: [
        {
          id: "action1",
          displayText: "Action 1",
          onClick: record => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record.id}`);
          }
        },
        {
          id: "actionDivider",
          divider: true
        },
        {
          id: "action2",
          displayText: "Action 2",
          onClick: record => {
            // eslint-disable-next-line no-console
            console.log(`action on record ${record.id}`);
          }
        }
      ]
    })
  }
];
export default {
  title: "Components/Table",
  decorators: [withKnobs],
  parameters: {
    readme: {
      sidebar: README,
      StoryPreview: Preview
    }
  }
};
export const Default = () => (
  <Table
    sortable={boolean("Sortable", false)}
    selectable={boolean("Selectable", false)}
    columns={object("Columns", columns)}
    records={object("Data", response.data.patientPagination.items)}
    headerProps={object("Header Props", { style: { background: "pink" } })}
    rowProps={object("Row Props", { style: {} })}
    cellProps={object("Cell Props", { style: {} })}
    bodyProps={object("Body Props", { style: {} })}
  />
);
Default.story = {
  name: "default"
};
export const WithScrollableContainer = () => (
  <ScrollableContainer>
    <Table
      columns={object("Columns", columns)}
      records={response.data.patientPagination.items}
      headerProps={object("Header Props", { style: {}, className: {} })}
      rowProps={object("Row Props", { style: {} })}
      cellProps={object("Cell Props", { style: {} })}
      bodyProps={object("Body Props", { style: {} })}
    />
  </ScrollableContainer>
);
WithScrollableContainer.story = {
  name: "with scrollable container"
};
