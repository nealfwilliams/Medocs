/**
 * Created by neal on 10/26/14.
 */
 var s3_upload = function(identifier, status_elem, preview_elem){
    console.log("upload started");
     $("#upload").show();
    var status_elem = document.getElementById(status_elem);
    var upload_preview = document.getElementById(preview_elem);
    var s3_url = '/sign_s3/' + identifier + '/';

    var s3upload = new S3Upload({
        file_dom_selector: 'file',
        s3_sign_put_url: s3_url,

        onProgress: function(percent, message) {
            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
        },

        onFinishS3Put: function(url) {
            if (identifier=="preview") {
                console.log("upload finished");
                status_elem.innerHTML = 'Preview';
                if (media == "image") {
                    upload_preview.innerHTML = '<img src="' + url + '" style="width:300px;" />';
                }
                if (media == "video") {
                    upload_preview.innerHTML = '<video width="300" controls> \
                        <source src="' + url + '" type="video/mp4"> \
                        <source src="' + url + '" type="video/ogg"> \
                        <source src="' + url + '" type="video/webm"> \
                        our browser does not support the video tag. \
                        </video>';
                }
            }
            else if (identifier == "profile") {
                 upload_preview.innerHTML = '<img src="' + url + '" style="width:300px;" />';
            }

            else {
                post_to_map();
            }
        },

        onError: function(status) {
            status_elem.innerHTML = 'Upload error: ' + status;
        }

    });

};
