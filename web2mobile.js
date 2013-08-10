(function() {

    // the minimum version of jQuery we want
    var v = "1.9.1";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initWeb2Mobile();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initWeb2Mobile();
    }

    function initWeb2Mobile() {


        //check to see if web2mobile is already present
        //if not present - create it. if present - unhide it (if hidden)
        if ( $('#web2Mobile').length === 0 ) {
            createApp();
        } else {
            $('#web2Mobile').fadeIn();
        }


        //create and append the html for the application
        function createApp() {
            $( '<form action="" id="web2Mobile">\
                <h2>Web 2 Mobile <span>X</span></h2>\
                <ol>\
                    <li>\
                        <input type="hidden" name="w2mLocation" value="">\
                        <label for="w2mPhoneNumber">Phone Number</label>\
                        <input type="text" name="w2mPhoneNumber">\
                    </li>\
                    <li>\
                        <label for="w2mCarrier">Carrier</label>\
                        <select name="w2mCarrier">\
                            <option value="mms.att.net">AT&T</option>\
                            <option value="vzwpix.com">Verizon</option>\
                        </select>\
                    </li>\
                </ol>\
                <button type="submit">Send</button>\
            </form>').hide().appendTo( $('body')).fadeIn();

            //load the css
            $('head').append('<link rel="stylesheet" href="http://www.joshdforbes.com/web2mobile/styles.css" type="text/css" />');

        };

        // the actual application
        var Web2Mobile = {
            init: function( config ) {
                this.config = config;
                this.setLocation();
                this.bindEvents();
            },

            //save the location url to the form value
            setLocation: function() {
                this.config.location.val(this.config.currentLocation);
            },

            //bind click event to button
            bindEvents: function() {
                this.config.button.on( 'click', this.sendText );
                this.config.button.on( 'click', this.close );
                this.config.close.on( 'click', this.close );
            },

            //send data to php file that is waiting to send the text
            sendText: function( e ) {
                var self = Web2Mobile;
                $.ajax({
                    type: 'GET',
                    url: 'http://www.joshdforbes.com/web2mobile/web2mobile.php',
                    data: self.config.form.serialize(),
                    //not actually getting data back, but IE9 won't work without this:
                    dataType: 'jsonp',
                    cache: false
                });
                e.preventDefault();
            },

            close: function( e ) {
                var self = Web2Mobile;
                self.config.form.fadeOut();
            }
        };

        //init Web2Mobile
        Web2Mobile.init({
            form: $('#web2Mobile'),
            button: $('#web2Mobile button'),
            close: $('#web2Mobile span'),
            location: $('#web2Mobile input[name=w2mLocation]'),
            currentLocation: $(location).attr('href'),
        });

    }

})();