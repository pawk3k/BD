import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import EnhancedTable from "./history-table";
export default function Rents() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <div>
      {!isLoggedin ? (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsLoggedin(!isLoggedin)}
          >
            Log in
          </Button>
          <div>You have to log in to see content</div>
        </div>
      ) : (
        <div>
          <EnhancedTable />
        </div>
      )}
    </div>
  );
}
