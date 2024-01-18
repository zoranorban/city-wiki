import { FC } from "react";

interface TypographyProps {
  isLoggedIn: boolean;
  text?: string;
}

const Typography: FC<TypographyProps> = (props) => {
  return (
    <p>
      {props.text} Loggedin:{props.isLoggedIn}
    </p>
  );
};

export default Typography;
