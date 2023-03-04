export const getPlacement = (
  placement?: "Left" | "Center" | "Right" | null
): "start" | "center" | "end" => {
  switch (placement) {
    case "Center":
      return "center";
    case "Right":
      return "end";
    case "Left":
    default:
      return "start";
  }
};
