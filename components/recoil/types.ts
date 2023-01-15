export interface IToastAlertInterface {
  id: string;
  kind: "success" | "warning";
  heading: string;
  description: string | React.ReactNode;
}
