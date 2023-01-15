import React from "react";

//helper
import { getImageDimensions, ImageDimensions } from "components/helper";

function useImageDimensions(src: string) {
  const [dimensions, setDimensions] = React.useState<ImageDimensions>();

  React.useEffect(() => {
    getImageDimensions(src).then((value) => setDimensions(value));
  }, []);
  
  return dimensions;
}

export default useImageDimensions;
