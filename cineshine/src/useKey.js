import { useEffect } from "react";

export function useKey(key, action, option) {
  useEffect(
    function () {
      function Callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) action();
        option?.();
      }

      document.addEventListener("keydown", Callback);
      return function () {
        document.removeEventListener("keydown", Callback);
      };
    },
    [action, key, option]
  );
}
