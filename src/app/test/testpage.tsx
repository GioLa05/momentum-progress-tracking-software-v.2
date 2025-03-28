// File: testpage.tsx


<div>
  <MainComponent
    label="დასაწყები"
    placeholder=""
    type="name"
    iconSrc="icon.svg"
    disabled={false}
    size="small" // or "big"
    hideBottomText={true} // Hide bottom text
  />
  <CreateAnEmployee />
  <CreateAnEmployee text="გაუქმება" />
  <CreateAnEmployee text="შექმენი ახალი დავალება" />
  <CreateNewTask />
  <CreateNewTask showImage={false} text="დაამატე თანამშრომელი" />
  <CreateNewTask showImage={true} text="შექმენი ახალი დავალება" />
  <UploadPhoto />
  <StatusDropdown />
  <PriorityDropdown />
  <MainComponent
    placeholder=""
    type="text"
    iconSrc="icon-source"
    disabled={false}
    label={""}
    size="small" // or "big"
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
    label="პასუხისმგებელი"
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
  <AddCoworker />
  <AddedCoworker />
  <Level priority="high" size="big" />
</div>;
