import React, { useContext } from "react";
import { Context } from "store/search";

const Index = () => {
  const { searched } = useContext(Context);
  console.log(searched);

  return <div>index</div>;
};

export default Index;
