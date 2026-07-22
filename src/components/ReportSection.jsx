function ReportSection({
    title,
    children,
}) {
    return (
        <section className="report-section">
            <h2>{title}</h2>

            {children}
        </section>
    );
}

export default ReportSection;