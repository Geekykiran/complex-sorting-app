import React from "react";

const SortControls = ({
  primaryField,
  setPrimaryField,
  primaryOrder,
  setPrimaryOrder,
  secondaryField,
  setSecondaryField,
  secondaryOrder,
  setSecondaryOrder
}) => {
  const fields = ["name", "age", "date"];

  return (
    <div className="space-y-4">
      {/* Primary sort */}
      <div className="flex items-center gap-4">
        <select
          className="border px-3 py-2 rounded"
          value={primaryField}
          onChange={(e) => setPrimaryField(e.target.value)}
        >
          {fields.map((f) => (
            <option key={f} value={f}>
              Primary: {f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() =>
            setPrimaryOrder(primaryOrder === "asc" ? "desc" : "asc")
          }
        >
          {primaryOrder === "asc" ? "⬆ ASC" : "⬇ DESC"}
        </button>
      </div>

      {/* Secondary sort */}
      <div className="flex items-center gap-4">
        <select
          className="border px-3 py-2 rounded"
          value={secondaryField}
          onChange={(e) => setSecondaryField(e.target.value)}
        >
          {fields.map((f) =>
            f === primaryField ? null : (
              <option key={f} value={f}>
                Secondary: {f.charAt(0).toUpperCase() + f.slice(1)}
              </option>
            )
          )}
        </select>

        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() =>
            setSecondaryOrder(secondaryOrder === "asc" ? "desc" : "asc")
          }
        >
          {secondaryOrder === "asc" ? "⬆ ASC" : "⬇ DESC"}
        </button>
      </div>
    </div>
  );
};

export default SortControls;
