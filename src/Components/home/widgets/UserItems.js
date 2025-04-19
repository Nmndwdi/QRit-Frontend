import Listview from './Listview';

function UserItems({data , RetrieveData}) {

  const buttonsShouldBeShown = true;

  return (
    <div className="w-full">
      {data !== null && (
        <Listview
          data={data}
          buttonsShouldBeShown={buttonsShouldBeShown}
          RetrieveData={RetrieveData}
        />
      )}
    </div>
  )  
}

export default UserItems