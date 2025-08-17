import React, { useState } from "react";
import SortControls from "./components/SortControls";

const initialData = [
  { name: "Alice", age: 25, date: "2023-01-10" },
  { name: "Bob", age: 30, date: "2022-12-05" },
  { name: "Charlie", age: 22, date: "2024-02-15" },
  { name: "David", age: 25, date: "2021-09-01" },
  { name: "Evelyn", age: 30, date: "2022-06-18" },
  { name: "Frank", age: 28, date: "2023-07-20" },
  { name: "Grace", age: 22, date: "2022-11-30" },
  { name: "Henry", age: 27, date: "2024-03-10" },
  { name: "Ivy", age: 25, date: "2021-05-12" },
  { name: "Jack", age: 30, date: "2023-09-25" }
];


export default function App() {
  const [data, setData] = useState(initialData);

  const [primaryField, setPrimaryField] = useState("name");
  const [primaryOrder, setPrimaryOrder] = useState("asc");

  const [secondaryField, setSecondaryField] = useState("age");
  const [secondaryOrder, setSecondaryOrder] = useState("asc");

  // Multi-level sort function
  const sortData = () => {
    const sorted = [...data].sort((a, b) => {
      // 1) Primary sort
      let primaryResult = compare(a, b, primaryField, primaryOrder);
      if (primaryResult !== 0) return primaryResult;

      // 2) Secondary (if tie)
      return compare(a, b, secondaryField, secondaryOrder);
    });

    setData(sorted);
  };

  // Helper compare function
  const compare = (a, b, field, order) => {
    if (field === "date") {
      const diff = new Date(a.date) - new Date(b.date);
      return order === "asc" ? diff : -diff;
    }

    if (typeof a[field] === "string") {
      return order === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    }

    // number
    return order === "asc" ? a[field] - b[field] : b[field] - a[field];
  };

  // When dropdowns or orders change, auto-sort
  React.useEffect(() => {
    sortData();
    // eslint-disable-next-line
  }, [primaryField, primaryOrder, secondaryField, secondaryOrder]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Multi-Level Sorting</h1>

        <SortControls
          primaryField={primaryField}
          setPrimaryField={setPrimaryField}
          primaryOrder={primaryOrder}
          setPrimaryOrder={setPrimaryOrder}
          secondaryField={secondaryField}
          setSecondaryField={setSecondaryField}
          secondaryOrder={secondaryOrder}
          setSecondaryOrder={setSecondaryOrder}
        />

        <ul className="mt-6 space-y-2">
          {data.map((person, idx) => (
            <li key={idx} className="p-3 bg-blue-50 rounded shadow text-gray-800">
              <strong>{person.name}</strong> — Age: {person.age} — Date: {person.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
