import { useTranslation } from "react-i18next";
import { JobExample } from "../../@types/jobExample";
import { IMG_THUMBNAILS_DB_PATH, ORIGIN } from "../../utils/constants";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { deleteJobThunk } from "../../store/thunks/jobDetailThunk";

interface AdminJobsSectionProps {
  jobsList: JobExample[];
  category: string;
}

const AdminJobsSection: React.FC<AdminJobsSectionProps> = ({
  jobsList,
  category,
}) => {
  const { t } = useTranslation();
  const imgUrlPath = `${IMG_THUMBNAILS_DB_PATH}`;
  const dispatch: AppDispatch = useDispatch();
  const origin = ORIGIN;
  const filteredList = jobsList
    ? jobsList.filter((jobExample) => jobExample.category.includes(category))
    : [];
  const handleDeleteJob = (jobId: string) => {
    dispatch(deleteJobThunk({ jobId }));
  };

  return (
    <div>
      {filteredList && filteredList.length > 0 ? (
        <section>
          <ul>
            {filteredList.map((jobExample) => (
              <li key={jobExample._id}>
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet={`${imgUrlPath}${encodeURIComponent(
                      jobExample.pictures.mainPicture
                    )}`}
                  />
                  <img
                    src={`${imgUrlPath}${encodeURIComponent(
                      jobExample.pictures.mainPicture
                    )}`}
                    alt={jobExample.versions[0].title}
                    crossOrigin={origin}
                  />
                </picture>
                <p>{jobExample.versions[0].title}</p>
                <i className="fa-solid fa-pen-to-square"></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handleDeleteJob(jobExample._id)}
                ></i>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p>{t("generic.empty_section")}</p>
      )}
    </div>
  );
};
export default AdminJobsSection;
