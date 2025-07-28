import { useEffect, useState } from "react";
import { triplit } from "../../triplit/client";

export function DBStatus() {
  const [status, setStatus] = useState(() => triplit.connectionStatus);
  useEffect(
    () =>
      triplit.onConnectionStatusChange((s) => {
        setStatus(s);
      }),
    []
  );
  return <div>DB status: {status}</div>;
}
