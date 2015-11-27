$(function() {
    
    module("Basic");
    

    var CST_NB_OF_FRANCE_DPTMT = 96;
    var CST_MAP_MAX_WIDTH = 800;
    var CST_MAP_MAX_HEIGHT = 834.8948306319708; // Calculated

    test( "Default instance creation", function(assert ) {

        /* Create the basic map! */
        $(".mapcontainer").mapael({
            map: {
                name: "france_departments"
            }
        });

        /* Some basic checks */
        assert.ok($(".mapcontainer .map svg")[0], "SVG map created" );
        assert.ok($(".mapcontainer .map svg path")[0], "Path in SVG map" );
        assert.equal($(".mapcontainer .map svg path").length, CST_NB_OF_FRANCE_DPTMT, "All France department drawn" );
        assert.equal($(".mapcontainer .map svg").attr("width"), CST_MAP_MAX_WIDTH, "Check map width size" );
        assert.equal($(".mapcontainer .map svg").attr("height"), CST_MAP_MAX_HEIGHT, "Check map height size" );
        assert.ok($(".mapcontainer").hasClass("mapael"), "Has mapael class" );
        assert.ok(typeof $(".mapcontainer").data("mapael") === "function", "Has mapael data" );
        assert.ok($(".mapcontainer .map .mapTooltip")[0], "Has tooltip div" );

    });

    test( "Mouseover", function(assert ) {
        var mouseover_async_done = assert.async(CST_NB_OF_FRANCE_DPTMT);
        
        /* Create the map */
        $(".mapcontainer").mapael({
            map: {
                name: "france_departments"
            }
        });

        /* mouseover event check (background changement) */
        var default_fill = $(".mapcontainer svg path:first").attr("fill");
        $(".mapcontainer svg path").each(function(id, elem) {
            var $elem = $(elem);
            
            $elem.trigger("mouseover");
            setTimeout(function() {
                var new_fill = $elem.attr("fill");
                assert.notEqual(default_fill, new_fill, "Check new background" );
                assert.ok($(".mapcontainer .map .mapTooltip").is( ":hidden" ), "Check tooltip hidden" );
                
                $elem.trigger("mouseout");
                setTimeout(function() {
                    var new_fill = $elem.attr("fill");
                    assert.equal(new_fill, default_fill, "Check old background" );
                    mouseover_async_done();
                }, 500);
            }, 500);
        });
        
    });

    test( "Responsive", function(assert ) {
        var responsive_async_done = assert.async();
        
        /* Create the map */
        $(".mapcontainer").mapael({
            map: {
                name: "france_departments"
            }
        });
        
        /* Responsive checks */
        $(".mapcontainer").width(CST_MAP_MAX_WIDTH/2);
        $(window).trigger('resize');
        setTimeout(function() {
            var $svg = $(".mapcontainer .map svg");
            assert.equal($svg.attr("width"), CST_MAP_MAX_WIDTH/2, "Check new map width size" );
            assert.equal($svg.attr("height"), CST_MAP_MAX_HEIGHT/2, "Check new map height size" );
            
            $(".mapcontainer").width(CST_MAP_MAX_WIDTH);
            $(window).trigger('resize');
            setTimeout(function() {
                var $svg = $(".mapcontainer .map svg");
                assert.equal($svg.attr("width"), CST_MAP_MAX_WIDTH, "Check old map width size" );
                assert.equal($svg.attr("height"), CST_MAP_MAX_HEIGHT, "Check old map height size" );
                responsive_async_done();
            }, 500);
        }, 500);

    });

});