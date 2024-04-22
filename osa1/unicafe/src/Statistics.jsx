const StatisticLine = (props) => (
  <tr>
    <td>{props.text}:</td>
    <td> {props.value}</td>
  </tr>
);

const Statistics = (props) => {
  const totalReviews = props.good + props.neutral + props.bad;
  const averageReviews = totalReviews ? totalReviews / 3 : 0;
  const positiveAverage = totalReviews ? (props.good / totalReviews) * 100 : 0;
  const statistics = {
    good: props.good,
    neutral: props.neutral,
    bad: props.bad,
    all: totalReviews,
    average: averageReviews.toFixed(1),
    positive: positiveAverage.toFixed(2) + " %",
  };
  const noStatistics = totalReviews === 0;

  return (
    <div>
      <h1>statistics</h1>
      {noStatistics ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={statistics.good} />
            <StatisticLine text="neutral" value={statistics.neutral} />
            <StatisticLine text="bad" value={statistics.bad} />
            <StatisticLine text="all" value={statistics.all} />
            <StatisticLine text="average" value={statistics.average} />
            <StatisticLine text="positive" value={statistics.positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Statistics;
