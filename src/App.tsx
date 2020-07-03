import * as React from "react";
import { Table, IColumn } from "./table";
import { useMemo, useState } from "react";
import { createData } from "./create-data";

export default function App() {
  const columns: IColumn[] = useMemo(
    () => [
      { key: "firstName", title: "First name" },
      { key: "lastName", title: "Last name" },
      { key: "age", title: "Age" },
      { key: "visits", title: "Visits" },
      { key: "status", title: "Status" },
      { key: "tags", title: "Tags", render: (value: { join: (arg0: string) => void; }) => value.join(", ") }
    ],
    []
  );
   const [data] = useState(() => createData(50));
   // @ts-ignore
    return (
    <div>
      <h1>Test (1 lvl)</h1>
      <h3>Description of the task in the README.md</h3>
      <Table columns={columns} data={data}  setPageSize={()=>{}}/>
    </div>
  );
}
