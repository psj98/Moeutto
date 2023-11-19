import LinearBright from "../atoms/LinearBright";
import LinearTemp from "../atoms/LinearTemp";
import Coordinate from "../atoms/Coordinate";

const Graph = ({ graphResult }) => {
    return (
        <>
            <LinearTemp temperature={graphResult?.temperature} />
            <LinearBright darkness={graphResult?.darkness} />
            <Coordinate seasonX={graphResult?.seasonX} seasonY={graphResult?.seasonY} />
        </>
    )
}

export default Graph;