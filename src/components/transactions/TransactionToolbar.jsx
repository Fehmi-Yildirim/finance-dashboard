import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import { nl, enGB } from "date-fns/locale";
import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

function TransactionToolbar({
    search,
    setSearch,
    filter,
    setFilter,
    dateFilter,
    setDateFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}) {


    const { t, i18n } = useTranslation();
    const locale = i18n.language === "nl" ? nl : enGB;
    const searchInputRef = useRef(null);

    return (
        <div className="toolbar">

            <div className="toolbar-top">

                <div className="search-box">
                    <button
                        type="button"
                        className="search-icon-button"
                        onClick={() => searchInputRef.current.focus()}
                        aria-label="Search"
                    >
                        <Search size={18} />
                    </button>
                    <input
                        ref={searchInputRef}
                        className="search-input"
                        type="text"
                        value={search}
                        placeholder={t("transactions.search")}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />
                    {search && (
                        <button
                            type="button"
                            className="clear-search-button"
                            onClick={() => setSearch("")}
                            aria-label="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                <div className="filter-buttons">
                    <button
                        className={filter === "all" ? "active" : ""}
                        onClick={() => setFilter("all")}
                    >
                        {t("filter.all")}
                    </button>
                    <button
                        className={filter === "income" ? "active" : ""}
                        onClick={() => setFilter("income")}
                    >
                        {t("filter.income")}
                    </button>
                    <button
                        className={filter === "expense" ? "active" : ""}
                        onClick={() => setFilter("expense")}
                    >
                        {t("filter.expense")}
                    </button>
                </div>
            </div>

            <div className="date-filter">
                <label>{t("dateFilter.period")}</label>
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                >
                    <option value="all">{t("dateFilter.all")}</option>
                    <option value="today">{t("dateFilter.today")}</option>
                    <option value="month">{t("dateFilter.month")}</option>
                    <option value="year">{t("dateFilter.year")}</option>
                    <option value="custom">
                        {t("dateFilter.custom")}
                    </option>
                </select>

                {dateFilter === "custom" && (
                    <>
                        {t("dateFilter.from")}
                        <DatePicker
                            selected={startDate}
                            onChange={setStartDate}
                            dateFormat="dd-MM-yyyy"
                            locale={locale}
                            placeholderText={t("dateFilter.placeholder")}
                        />
                        {t("dateFilter.to")}
                        <DatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            dateFormat="dd-MM-yyyy"
                            locale={locale}
                            placeholderText={t("dateFilter.placeholder")}
                        />
                    </>
                )}
            </div>

        </div>
    );
}

export default TransactionToolbar;