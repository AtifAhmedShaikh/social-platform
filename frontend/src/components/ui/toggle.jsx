const UploadContentToggle = () => {
  return (
    <div className="flex justify-between border-b border-gray-400 py-2 text-sm" >
      <span>Disable to share anyone </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultValue
          className="sr-only peer"
          id="myLabel"
        />
        <div className="w-10 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>
    </div>
  );
};

export default UploadContentToggle;
