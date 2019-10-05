var office365_utils = {

  uploadData: function(data){
    upload.data = {values: data.values};
    wizard_model.confirmed = {
      SLat: "11",
      SLng: "12",
      DLat: "16",
      DLng: "17",
      CAT: "0",
      TXT: "",
      font_size: 30,
      smartLabel: true,
    };
    point_styles_model.fun.clear();
    upload.confirmUploadData();
  },

}
