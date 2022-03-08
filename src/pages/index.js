import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [gearRatios, setGearRatios] = useState({
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    reverse: 0,
  });

  const [gears, setGears] = useState({
    first: {
      label: "1st gear",
      key: "first",
      result: 0,
    },
    second: {
      label: "2nd gear",
      key: "second",
      result: 0,
    },
    third: {
      label: "3rd gear",
      key: "third",
      result: 0,
    },
    fourth: {
      label: "4th gear",
      key: "fourth",
      result: 0,
    },
    fifth: {
      label: "5th gear",
      key: "fifth",
      result: 0,
    },
    reverse: {
      label: "Reverse gear",
      key: "reverse",
      result: 0,
    },
  });

  const [finalDrive, setFinalDrive] = useState(1);
  const [wheelDiameter, setWheelDiameter] = useState(0);
  const [RPM, setRPM] = useState(0);

  const changeGearRatio = (key, value) => {
    let copyRatios = { ...gearRatios };
    copyRatios[key] = value;
    setGearRatios(copyRatios);
  };

  const calculateSpeedFromRPM = (RPM, gearRatio) => {
    let speed = 0;
    speed =
      (3.6 * RPM * wheelDiameter * Math.PI) / (60.0 * gearRatio * finalDrive);
    return Math.round(speed);
  };

  const calculate = (event) => {
    let copyGears = { ...gears };
    Object.keys(gears).forEach((key) => {
      copyGears[key].result = calculateSpeedFromRPM(RPM, gearRatios[key]);
    });
    setGears(copyGears);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>RPM to KMH</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.gearRatios}>
          Gear ratios:
          <div className={styles.gearRatiosForm}>
            {Object.keys(gears).map((gear) => {
              return (
                <div className={styles.gearRatioRow} key={gears[gear].key}>
                  <label className={styles.ratioLabel}>
                    {gears[gear].label}
                  </label>
                  <input
                    className={styles.ratioInput}
                    type='number'
                    onChange={(e) => {
                      changeGearRatio(
                        gears[gear].key,
                        parseFloat(e.target.value)
                      );
                    }}
                  ></input>
                  <div className={styles.gearResult}>
                    {gears[gear].result} KM/H
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.gearRatios}>
          Other inputs:
          <div className={styles.gearRatiosForm}>
            <div className={styles.gearRatioRow}>
              <label className={styles.ratioLabel}>Final drive</label>
              <input
                className={styles.ratioInput}
                type='number'
                onChange={(e) => {
                  setFinalDrive(e.target.value);
                }}
              ></input>
            </div>
            <div className={styles.gearRatioRow}>
              <label className={styles.ratioLabel}>Wheel diameter (m)</label>
              <input
                className={styles.ratioInput}
                type='number'
                onChange={(e) => {
                  setWheelDiameter(e.target.value);
                }}
              ></input>
            </div>
            <div className={styles.gearRatioRow}>
              <label className={styles.ratioLabel}>RPM</label>
              <input
                className={styles.ratioInput}
                type='number'
                onChange={(e) => {
                  setRPM(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <button onClick={calculate}>Calculate</button>
      </main>
    </div>
  );
}
