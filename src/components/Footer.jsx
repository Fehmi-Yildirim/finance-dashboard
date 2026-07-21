import { useTranslation } from "react-i18next";
import { appInfo } from "../config/appInfo";

function Footer() {

    const { t, i18n } = useTranslation();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const updated = currentDate.toLocaleDateString(i18n.language, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>
                    {appInfo.name} v{appInfo.version}
                </p>
                <p>
                    © {year} {appInfo.owner}. {t("footer.rights")}
                </p>
                <p>
                    {t("footer.lastBuild")}: {updated}
                </p>
            </div>
        </footer>
    );
}

export default Footer;