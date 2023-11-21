import LinearBright from "../atoms/LinearBright";
import LinearTemp from "../atoms/LinearTemp";
import Coordinate from "../atoms/Coordinate";

const Graph = ({ graphResult }) => {
    return (
      <>
        <div className="mt-[60px] mb-3 w-[80%] text-start text-AppBody1">오늘 스타일은 밝은 색인가요?</div>
        <LinearTemp temperature={graphResult?.temperature} />
        <div className="mt-[50px] mb-3 w-[80%] text-start text-AppBody1">오늘 스타일은 따뜻한가요?</div>
        <LinearBright darkness={graphResult?.darkness} />
        <div className="mt-[50px] mb-3 w-[80%] text-start text-AppBody1">오늘 스타일은 어떤 계절에 가깝죠?</div>
        <Coordinate seasonX={graphResult?.temperature} seasonY={graphResult?.darkness} />
      </>
    );
}

export default Graph;