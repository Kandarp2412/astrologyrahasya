import * as React from "react";
import { useContext } from "react";
import { globalContext } from "../../contexts/Context";
// import AppContext, { globalContext } from "../../context/Context";
// import { Text } from "../dashboard/Language";
import PropTypes from "prop-types";
import { Text } from "../Language";

const DetailMapper = (props) => {
  const { x, y, detail, signNumber } = props;
  // const { isDark } = React.useContext(AppContext);
  let tmp = { ...detail };
  delete tmp?.asc;
  delete tmp?.moonPos;
  // console.log(detail);

  let detailArray = Object.entries(tmp).sort((a, b) => {
    if (signNumber < 7) {
      return a[1].dms.d - b[1].dms.d;
    } else return b[1].dms.d - a[1].dms.d;
  });
  return (
    <>
      {detailArray.map(([key, obj], index) => {
        return (
          <text
            style={{ fill: "black", fontSize: "17px", marginTop: "10px" }}
            key={obj.text}
            id="XMLID_77_"
            transform={`translate(${x + 30} ${y + index * 17 - 12})`}
            className="st5 st6 detail"
          >
            {/* {obj.text} */}
            {obj.graha ? (
              <>
                {" "}
                <Text tid={obj.graha} /> {""}
                <Text tid={obj.dms.d} />:
                <Text tid={obj.dms.m} />:
                <Text tid={obj.dms.s} />
              </>
            ) : (
              obj.text
            )}
          </text>
        );
      })}
    </>
  );
};

function BirthChartSVG(props) {
  const { data, selectedCharts } = props;
  const { toggleTrue } = useContext(globalContext);
  // const { isDark } = React.useContext(AppContext);
  let xOffset = 0;
  let yOffset = 0;
  if (data)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" aria-labelledby="123title">
        <style>
          {
            ".st1{fill:#ff0}.st5{font-family:&apos;MyriadPro-Regular&apos;}.st6{font-size:16px}.st7{fill:none}.detail{text-anchor: middle}"
          }
          "
        </style>
        <g id="Background">
          <radialGradient
            id="Background_2_"
            cx={250}
            cy={248.667}
            r={250}
            gradientTransform="translate(0 1.333)"
            gradientUnits="userSpaceOnUse"
          ></radialGradient>
          <path
            id="Background_1_"
            fill="url(#Background_2_)"
            stroke="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="bevel"
            strokeMiterlimit={10}
            d="M0 0h500v500H0z"
          />
        </g>

        <Boxes />

        {selectedCharts && toggleTrue === false ? (
          <g id="center">
            <path id="XMLID_1_" className="st7" d="M176.7 111h65.5v13.7h-65.5z" />
            <text
              style={{ fill: "black" }}
              id="XMLID_3_"
              x={160.0 + xOffset}
              y={200.52 + yOffset}
              className="st5 st6"
            >
              Name:name
            </text>
            <text
              style={{ fill: "black" }}
              id="XMLID_3_"
              x={160.0 + xOffset}
              y={230.52 + yOffset}
              className="st5 st6"
            >
              Date : 24/04/2021
            </text>
            <text
              style={{ fill: "black" }}
              id="XMLID_3_"
              x={160.0 + xOffset}
              y={260.52 + yOffset}
              className="st5 st6"
            >
              Time : 13:49:32
            </text>
            <text
              style={{ fill: "black" }}
              id="XMLID_3_"
              x={160.0 + xOffset}
              y={290.52 + yOffset}
              className="st5 st6"
            >
              Latitude : 22.2837672
            </text>
            <text
              style={{ fill: "black" }}
              id="XMLID_3_"
              x={160.0 + xOffset}
              y={320.52 + yOffset}
              className="st5 st6"
            >
              Longitude : 73.1779212
            </text>
          </g>
        ) : null}

        <g id="Aries">
          <path id="XMLID_1_" className="st7" d="M176.7 111h65.5v13.7h-65.5z" />
          {/* <text
            id='XMLID_3_'
            x={200.0 + xOffset}
            y={119.52 + yOffset}
            className='st5 st6'
          >
            Aries
          </text> */}
          <text id="XMLID_79_" x={190.125 + xOffset} y={13.52 + yOffset} className="st5 st6">
            {/* {data[1]?.moonPos && `Mo(${data[1]?.moonPos})`} */}
          </text>
          {/* <div style={{}}> */}
          <DetailMapper
            // style={{ marginBottom: "10px" }}
            signNumber={1}
            x={153}
            y={50.0}
            detail={data[1]}
          />
          {/* </div> */}
          <text id="XMLID_11_" x={127.333 + xOffset} y={13.52 + yOffset} className="st5 st6">
            {/* As({data[1]?.asc}) */}
          </text>
        </g>

        <g id="Taurus">
          <path id="XMLID_94_" className="st7" d="M301.1 113.3h65.5V127h-65.5z" />
          {/* <text
            id='XMLID_93_'
            x={310.0 + xOffset}
            y={121.77 + yOffset}
            className='st5 st6'
          >
            {"Taurus"}
          </text> */}
          <path id="XMLID_92_" className="st7" d="M317.4 6.3h50.2V20h-50.2z" />
          <text id="XMLID_91_" x={315.22 + xOffset} y={14.77 + yOffset} className="st5 st6">
            {/* {data[2]?.moonPos && `Mo(${data[2]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={2} x={275} y={50} detail={data[2]} />

          <path id="XMLID_82_" className="st7" d="M253.6 6.3h45.3V20h-45.3z" />
          <text id="XMLID_81_" x={253.583 + xOffset} y={14.77 + yOffset} className="st5 st6">
            {/* As({data[2]?.asc}) */}
          </text>
        </g>

        <g id="Gemini">
          {/* <text
            id='XMLID_107_'
            x={435.0 + xOffset}
            y={120.77 + yOffset}
            className='st5 st6'
          >
            {"Gemini"}
          </text> */}
          <text id="XMLID_105_" x={440.136 + xOffset} y={13.77 + yOffset} className="st5 st6">
            {/* {data[3]?.moonPos && `Mo(${data[3]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={3} x={410.556} y={50} detail={data[3]} />

          <text id="XMLID_95_" x={379.5 + xOffset} y={13.77 + yOffset} className="st5 st6">
            {/* As({data[3]?.asc}) */}
          </text>
        </g>

        <g id="Cancer">
          {/* <text
            id='XMLID_186_'
            x={435.0 + xOffset}
            y={248.353 + yOffset}
            className='st5 st6'
          >
            {"Cancer"}
          </text> */}

          <text id="XMLID_184_" x={445.636 + xOffset} y={146.27 + yOffset} className="st5 st6">
            {/* {data[4]?.moonPos && `Mo(${data[4]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={4} x={405} y={184} detail={data[4]} />

          <text id="XMLID_123_" x={377.0 + xOffset} y={146.27 + yOffset} className="st5 st6">
            {/* As({data[4]?.asc}) */}
          </text>
        </g>

        <g id="Leo">
          {/* <text
            id='XMLID_227_'
            x={462.0 + xOffset}
            y={369.853 + yOffset}
            className='st5 st6'
          >
            {"Leo"}
          </text> */}

          <text id="XMLID_225_" x={440.55 + xOffset} y={270.77 + yOffset} className="st5 st6">
            {/* {data[5]?.moonPos && `Mo(${data[5]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={5} x={405} y={310} detail={data[5]} />

          <text id="XMLID_207_" x={380.96 + xOffset} y={270.77 + yOffset} className="st5 st6">
            {/* As({data[5]?.asc}) */}
          </text>
        </g>

        <g id="Virgo">
          <path id="XMLID_127_" className="st7" d="M428.9 486.3h65.5V500h-65.5z" />
          {/* <text
            id='XMLID_126_'
            x={453.0 + xOffset}
            y={494.853 + yOffset}
            className='st5 st6'
          >
            {"Virgo"}
          </text> */}

          <text id="XMLID_134_" x={450.053 + xOffset} y={398.77 + yOffset} className="st5 st6">
            {/* {data[6]?.moonPos && `Mo(${data[6]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={6} x={410} y={432} detail={data[6]} />

          <text id="XMLID_130_" x={381.416 + xOffset} y={398.77 + yOffset} className="st5 st6">
            {/* As({data[6]?.asc}) */}
          </text>
        </g>

        <g id="Libra">
          {/* <text
            id='XMLID_153_'
            x={328.0 + xOffset}
            y={495.853 + yOffset}
            className='st5 st6'
          >
            {"Libra"}
          </text> */}

          <text id="XMLID_151_" x={322.136 + xOffset} y={398.77 + yOffset} className="st5 st6">
            {/* {data[7]?.moonPos && `Mo(${data[7]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={7} x={270} y={432} detail={data[7]} />

          <text id="XMLID_138_" x={255.5 + xOffset} y={398.77 + yOffset} className="st5 st6">
            {/* As({data[7]?.asc}) */}
          </text>
        </g>

        <g id="Scorpio">
          {/* <text
            id='XMLID_132_'
            x={180.0 + xOffset}
            y={493.603 + yOffset}
            className='st5 st6'
          >
            {"Scorpio"}
          </text> */}
          <text id="XMLID_189_" x={195.886 + xOffset} y={398.52 + yOffset} className="st5 st6">
            {/* {data[8]?.moonPos && `Mo(${data[8]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={8} x={150} y={432} detail={data[8]} />
          <text id="XMLID_187_" x={129.25 + xOffset} y={398.52 + yOffset} className="st5 st6">
            {/* As({data[8]?.asc}) */}
          </text>
        </g>

        <g id="Sagitarus">
          <path id="XMLID_122_" className="st7" d="M53.1 485.1h65.5v13.7H53.1z" />
          {/* <text
            id='XMLID_121_'
            x={115 + xOffset}
            y={493.603 + yOffset}
            className='st5 st6'
            style={{ textAnchor: "end" }}
          >
            {"Sagitarus"}
          </text> */}
          <path id="XMLID_120_" className="st7" d="M69.4 383h50.2v13.7H69.4z" />
          <text
            id="XMLID_119_"
            x={115 + xOffset}
            y={398.52 + yOffset}
            className="st5 st6"
            style={{ textAnchor: "end" }}
          >
            {/* {data[9]?.moonPos && `Mo(${data[9]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={9} x={30} y={432} detail={data[9]} />

          <path id="XMLID_110_" className="st7" d="M5.6 383h45.3v13.7H5.6z" />
          <text id="XMLID_109_" x={5.583 + xOffset} y={398.52 + yOffset} className="st5 st6">
            {/* As({data[9]?.asc}) */}
          </text>
        </g>

        <g id="Capricorn">
          {/* <text
            id='XMLID_204_'
            x={118 + xOffset}
            y={368.603 + yOffset}
            className='st5 st6'
            style={{ textAnchor: "end" }}
          >
            {"Capricorn"}
          </text> */}
          <text
            id="XMLID_202_"
            x={118 + xOffset}
            y={273.52 + yOffset}
            className="st5 st6"
            style={{ textAnchor: "end" }}
          >
            {/* {data[10]?.moonPos && `Mo(${data[10]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={10} x={35} y={310} detail={data[10]} />

          <text id="XMLID_192_" x={5.083 + xOffset} y={273.52 + yOffset} className="st5 st6">
            {/* As({data[10]?.asc}) */}
          </text>
        </g>

        <g id="Aquarius">
          {/* <text
            id='XMLID_240_'
            x={118 + xOffset}
            y={246.645 + yOffset}
            style={{ textAnchor: "end" }}
            className='st5 st6'
          >
            {"Aquarius"}
          </text> */}
          <text
            id="XMLID_238_"
            x={118 + xOffset}
            y={150.562 + yOffset}
            style={{ textAnchor: "end" }}
            className="st5 st6"
          >
            {/* {data[11]?.moonPos && `Mo(${data[11]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={11} x={34} y={190} detail={data[11]} />

          <text id="XMLID_206_" x={3.083 + xOffset} y={150.562 + yOffset} className="st5 st6">
            {/* As({data[11]?.asc}) */}
          </text>
        </g>

        <g id="Pisces">
          {/* <text
            id='XMLID_40_'
            x={118 + xOffset}
            y={119.52 + yOffset}
            className='st5 st6'
            style={{ textAnchor: "end" }}
          >
            {"Pisces"}
          </text> */}
          <text
            id="XMLID_60_"
            x={119 + xOffset}
            style={{ textAnchor: "end" }}
            y={13.52 + yOffset}
            className="st5 st6"
          >
            {/* {data[12]?.moonPos && `Mo(${data[12]?.moonPos})`} */}
          </text>
          <DetailMapper signNumber={12} x={25} y={50} detail={data[12]} />

          <text id="XMLID_58_" x={3.666 + xOffset} y={13.52 + yOffset} className="st5 st6">
            {/* As({data[12]?.asc}) */}
          </text>
        </g>
      </svg>
    );
  return <> </>;
}

const Boxes = () => {
  // const { isDark } = React.useContext(AppContext);
  return (
    <g
      id="Boxes"
      // fill='#FF0'
      stroke={"#000"}
      strokeLinecap="round"
      strokeLinejoin="bevel"
      strokeMiterlimit="5"
      strokeWidth="1"
    >
      <path id="XMLID_2_" d="M0 128.5L500 128.5" />
      <path id="XMLID_6_" d="M121.5 511L121.5 -10" />
      <path id="XMLID_8_" d="M246.5 128L246.5 -10" />
      <path id="XMLID_9_" d="M246.5 511L246.5 379" />
      <path id="XMLID_7_" d="M371.5 511L371.5 -10" />
      <path id="XMLID_4_" d="M0 253.5L121 253.5" />
      <path id="XMLID_10_" d="M374 253.5L503 253.5" />
      <path id="XMLID_5_" d="M0 378.5L500 378.5" />
    </g>
  );
};

DetailMapper.propTypes = {
  x: PropTypes.node.isRequired,
  y: PropTypes.node.isRequired,
  detail: PropTypes.node.isRequired,
  signNumber: PropTypes.node.isRequired,
};

BirthChartSVG.propTypes = {
  data: PropTypes.node.isRequired,
  selectedCharts: PropTypes.node.isRequired,
};

export default React.memo(BirthChartSVG);
