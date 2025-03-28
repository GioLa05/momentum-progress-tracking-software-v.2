"use client";

import React from "react";
import styles from "./page.module.css";
import CreateNewTask from "../Components/CreateNewTask/CreateNewTask";
import AnswerBtn from "../Components/AnswerBtn/answerBtn";
import CreateAnEmployee from "../Components/CreateAnEmployee/createAnEmployee";
import LargePrimaryButton from "@/Components/LargePrimaryButton/LargePrimaryButton";
import RankButton from "@/Components/RankButton/RankButton";
import Level from "@/Components/Level/Level";
import AddCoworker from "@/Components/AddCoworker/AddCoworker";
import AddedCoworker from "@/Components/AddedCoworker/AddedCoworker";
import Task from "@/Components/Task/Task";
import SelectedFilter from "@/Components/SelectedFilter/SelectedFilter";
import Answer from "@/Components/Answer/answer";
import Progress from "@/Components/Progress/progress";
import Dropdown from "@/Components/Dropdown/Dropdown";
import CheckboxBtn from "@/Components/CheckboxBtn/CheckboxBtn";
import DropdownContent from "@/Components/DropdownContent/DropdownContent";
import DatePickerNative from "@/Components/Calendar/DatePickerNative";
import ResponsibleEmployee from "@/Components/ResponsibleEmployee/ResponsibleEmployee";
import EmployeeName from "@/Components/ResponsibleEmployee/ResponsibleEmployee";
import MainComponent from "@/Components/ResponsibleEmployee/ResponsibleEmployee";
import PriorityDropdown from "@/Components/PriorityDropdown/PriorityDropdown";
import StatusDropdown from "@/Components/StatusDropdown/StatusDropdown";
import UploadPhoto from "@/Components/UploadPhoto/UploadPhoto";
import UploadPhotoButton from "@/Components/UploadPhotoButton/UploadPhotoButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <UploadPhotoButton />
      <UploadPhoto />
      <StatusDropdown />
      <PriorityDropdown />
      <MainComponent
        placeholder=""
        type="text"
        iconSrc="icon-source"
        disabled={false}
        label={""}
      />
      {/* MainComponent with "name" type */}
      <MainComponent
        placeholder=""
        type="text"
        iconSrc="icon-source"
        disabled={false}
        label={""}
      />
      {/* MainComponent with "name" type */}
      <MainComponent
        placeholder=""
        type="name"
        iconSrc="icon-source"
        disabled={false}
        label={""}
      />
      {/* MainComponent with "name" type */}
      <MainComponent
        placeholder=""
        type="surname"
        iconSrc="icon-source"
        disabled={false}
        label={""}
      />
      {/* ResponsibleEmployee with "responsible" type */}
      <EmployeeName
        label="პასუხისმგებელიsasa"
        placeholder="დასაწყები"
        type="responsible"
        iconSrc="icon-source"
        disabled={false} // Set as needed
      />

      {/* ResponsibleEmployee with "department" type */}
      <ResponsibleEmployee
        label="დეპარტამენტი"
        placeholder="დასაწყები"
        type="department"
        iconSrc="icon-source"
        disabled={false} // Set as needed
      />

      <AddedCoworker type="employee" name="ნატალია გიორგაძე" />
      <AddedCoworker type="department" name="IT დეპარტამენტი" />
      <ResponsibleEmployee
        placeholder="დასაწყები"
        type="text"
        iconSrc="icon.svg"
        disabled={false}
      />

      <DatePickerNative />
      <Dropdown />
      <SelectedFilter name="გიოლა" />
      <SelectedFilter name="ვინმე" />
      <DropdownContent />
      <CheckboxBtn label="დიზაინის დეპარტამენტი" />
      <CheckboxBtn imageSrc="/Coworker.png" label="მარკეტინგის დეპარტამენტი" />
      <Progress text="დასაწყები" />
      <Progress text="პროგრესში" />
      <Progress text="მზად ტესტირებისთვის" />
      <Progress text="დასრულებული" />
      <Answer
        type="question"
        name="ემილია მორგანი"
        text="დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება, რომ ელემენტებს ჰქონდეს შესაბამისი რეზოლუცია."
        imageSrc="/Coworker.png"
      />
      <Answer
        type="answer"
        name="ნატალია გიორგაძე"
        text="დიზაინი სუფთად ჩანს, მაგრამ კოდირებისას მნიშვნელოვანი იქნება."
        imageSrc="/Coworker.png"
      />
      <Task
        comments={8}
        date="22 იანვ, 2022"
        title="Redberry-ს საიტის ლენდინგის დიზაინი "
        description="შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას."
      />
      <CreateNewTask />
      <AnswerBtn />
      <CreateAnEmployee />
      <LargePrimaryButton text="Buttoniiii" />
      <RankButton color="pink" text="დიზაინი" />
      <RankButton color="orange" text="მარკეტინგი" />
      <RankButton color="blue" text="ლოჯისტიკა" />
      <RankButton color="yellow" text="ინფ. ტექ." />
      <AddCoworker />
      <AddedCoworker />
      <Level priority="high" size="big" />
      <Level priority="medium" size="big" />
      <Level priority="low" size="big" />
      <Level priority="high" size="small" />
      <Level priority="medium" size="small" />
      <Level priority="low" size="small" />
    </div>
  );
}
