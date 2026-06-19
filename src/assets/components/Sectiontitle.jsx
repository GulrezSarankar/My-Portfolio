export default function SectionTitle({ title }) {
    return (
      <h2
        className="mb-10 text-center text-3xl font-extrabold tracking-tight text-heading md:text-4xl"
        data-aos="fade-up"
      >
        <span className="accent-text">/</span> {title}
      </h2>
    );
  }
  
