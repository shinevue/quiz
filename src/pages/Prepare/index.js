import React, { useState, useEffect, version } from "react";
import { MDBBtn, MDBTypography } from "mdb-react-ui-kit";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import LANG_DATA from "../../consts/LanguagesData.json";

import "./styles.css";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import { GetBooksSetting } from "../../libs/axios";

let SECTION_DATA;

export default function PreparePage(props) {
  const [versionOptions, setVersionOptions] = useState([]);

  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [selectedVersion, setSelectedVersion] = useState({});
  const [selectedSection, setSelectedSection] = useState({});

  useEffect(() => {
    (async () => {
      SECTION_DATA = await GetBooksSetting();
      const previewLang = localStorage.getItem("language");
      setSelectedLanguage({
        language: previewLang,
      });

      if (previewLang) {
        setVersionOptions(
          LANG_DATA.find((one) => one.language == previewLang).translations
        );
      }
      if (localStorage.getItem("version-short")) {
        setSelectedVersion({
          short_name: localStorage.getItem("version-short"),
          full_name: localStorage.getItem("version-full"),
        });
      }
      if (localStorage.getItem("section-value")) {
        setSelectedSection({
          value: localStorage.getItem("section-value"),
          bible: localStorage.getItem("section-label"),
        });
      }
    })();
  }, []);

  const navigate = useNavigate();
  const onStart = () => {
    navigate(`/main/${selectedVersion.short_name}/${selectedSection.value}`);
  };

  return (
    <div className="before-page h-screen flex flex-col md:flex-row md:gap-40 lg:gap-48 md:items-center">
      <MDBTypography className="font-sans font-bold text-center text-2xl sm:text-3xl py-6 md:w-1/4 xl:text-5xl">
        Configure Settings
      </MDBTypography>
      <div className="mt-2 md:w-3/4">
        <div className="mt-1 w-full items-center">
          <div className="font-sans font-bold py-2 md:py-4 text-lg sm:text-xl  xl:mt-12 xl:text-3xl">
            Language:
          </div>
          <Select
            readOnly
            isSearchable={false}
            className="mb-1 sm:w-full"
            placeholder={"Select language"}
            options={LANG_DATA}
            getOptionLabel={(option) => option.language}
            getOptionValue={(option) => option.language}
            onChange={(e) => {
              setSelectedLanguage(e);
              localStorage.setItem("language", e.language);
              setVersionOptions(e.translations);
              setSelectedVersion({});
            }}
            value={
              localStorage.getItem("language")
                ? selectedLanguage
                : "Please select"
            }
            required
          />
        </div>

        <div className="mt-4 w-full items-center">
          <div className="font-sans font-bold py-2 md:py-4 text-lg sm:text-xl xl:mt-12 xl:text-3xl">
            Version:
          </div>
          <Select
            readOnly
            isSearchable={false}
            className="mb-1 sm:w-full"
            placeholder={"Select version"}
            options={versionOptions}
            getOptionLabel={(option) =>
              option.short_name && `${option.short_name} - ${option.full_name}`
            }
            getOptionValue={(option) => option.short_name}
            value={
              selectedVersion.short_name ? selectedVersion : "Please select"
            }
            onChange={(val) => {
              setSelectedVersion(val);
              localStorage.setItem("version-short", val.short_name);
              localStorage.setItem("version-full", val.full_name);
            }}
            required
          />
        </div>

        <div className="mt-4 w-full items-center">
          <div className="font-sans font-bold py-2 text-lg sm:text-xl xl:mt-12 xl:text-3xl">
            Section of Bible:
          </div>
          <Select
            readOnly
            isSearchable={false}
            className="mb-1 sm:w-full"
            placeholder={"Select section"}
            options={SECTION_DATA}
            getOptionLabel={(option) => option.bible}
            getOptionValue={(option) => option.bible}
            value={
              localStorage.getItem("section-label")
                ? selectedSection
                : "Please select"
            }
            onChange={(val) => {
              setSelectedSection(val);
              localStorage.setItem("section-value", val.value);
              localStorage.setItem("section-label", val.bible);
              localStorage.setItem("section-num", val.num);
            }}
          />
        </div>

        <div className="text-right">
          <MDBBtn
            type="submit"
            className="bg-green-600 mt-3"
            onClick={onStart}
            disabled={
              !(
                selectedLanguage.language &&
                selectedVersion.short_name &&
                selectedSection.value
              )
            }
          >
            <SchoolSharpIcon /> <span className="text-md ms-2">Start</span>
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}
