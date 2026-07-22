import { useTranslation } from "react-i18next";

function AboutApp() {
    const { t } = useTranslation();

    const technologies = [
        "React",
        "React Router",
        "Bootstrap",
        "React i18next",
        "date-fns"
    ];

    return (
        <div className="container mt-4">

            <div className="card shadow-sm">
                <div className="card-body">

                    <h1 className="mb-3">
                        {t("about.title")}
                    </h1>

                    <p>
                        {t("about.description")}
                    </p>

                    <hr />

                    <h3>
                        {t("about.version")}
                    </h3>

                    <p>
                        1.0.0
                    </p>

                    <h3>
                        {t("about.developer")}
                    </h3>

                    <p>
                        {t("about.developerName")}
                    </p>

                    <h3>
                        {t("about.technology")}
                    </h3>

                    <ul>
                        {technologies.map((item) => (
                            <li key={item}>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <h3>
                        {t("about.features")}
                    </h3>

                    <ul>
                        <li>{t("about.featureTransactions")}</li>
                        <li>{t("about.featureReports")}</li>
                        <li>{t("about.featureSettings")}</li>
                        <li>{t("about.featureLanguages")}</li>
                    </ul>

                    <h3>
                        {t("about.contact")}
                    </h3>

                    <p>
                        {t("about.email")}:
                    </p>

                    <h3>
                        {t("about.license")}
                    </h3>

                    <p>
                        {t("about.licenseName")}
                    </p>

                </div>
            </div>

        </div>
    );
}

export default AboutApp;