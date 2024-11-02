import JobExamplesList from "../jobExamples/JobExamplesList";

const Development = () => {
  return (
    <main className="porfolio__main">
      <h1>Development</h1>
      <section className="examples__showcase">
        <JobExamplesList category="development" />
      </section>
    </main>
  );
};

export default Development;
