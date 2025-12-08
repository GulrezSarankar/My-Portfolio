export default function SectionTitle({ title }) {
    return (
      <h2
        className="text-4xl font-bold mb-10 text-center"
        data-aos="fade-up"
      >
        <span className="text-primary">#</span> {title}
      </h2>
    );
  }
  