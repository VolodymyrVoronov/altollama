import { type ReactNode } from "react";

import {
  Status,
  StatusIndicator,
  StatusLabel,
} from "@/components/kibo-ui/status";

export interface ISettingsOnlineMessageProps {
  children?: ReactNode;
}

const SettingsOnlineMessage = ({ children }: ISettingsOnlineMessageProps) => {
  return (
    <Status status="online" className="w-full">
      <StatusIndicator />
      <StatusLabel>{children ?? "The system is running"}</StatusLabel>
    </Status>
  );
};

export default SettingsOnlineMessage;
