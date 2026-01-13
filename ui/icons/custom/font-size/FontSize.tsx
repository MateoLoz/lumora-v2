import SmallIcon from "./Small";
import MediumIcon from "./Medium";
import LargeIcon from "./Large";
import ExtraSmallIcon from "./ExtraSmall";
import ExtraLargeIcon from "./ExtraLarge";

const fontSizeIcon = () => {
    return {
        small: <SmallIcon />,
        medium: <MediumIcon />,
        large: <LargeIcon />,
        extraLarge: <ExtraLargeIcon />,
        extraSmall: <ExtraSmallIcon />
    }
}

export default fontSizeIcon;