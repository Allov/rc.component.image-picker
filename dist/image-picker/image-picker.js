/*
    TODO: Faire un concreteiamgeselector (celui-ci étant un conceptualImageSelector).. 
    renommer les fichiers et faire les mod. nécessaires
    ou faire comme pour image-dialog et faire en sorte que ce widget retourne un objet du genre 
    {
        conceptualImage: conceptualImage,
        concreteImage: concreteImage,
        imageForLineups: bool //
    }
*/

define(['text!./image-picker.html', 'jquery', 'framework-utilities', 'framework', 'knockout'],
    function(template, $, utilities, framework, ko) {
        "use strict";

        var ViewModel = function(params, componentInfo) {
            var self = this;
            self.activate(params);
        };

        ViewModel.prototype.activate = function(args) {
            var self = this;

            self.image = args.image; //observable image
            self.settings = $.extend({
                defaultImageUrl: '/images/choisir2.png',
                imageShownRatio: '16:9',
                imageShownWidth: 635,
                imageForLineups: false,
                dimensions: [],
                contentTypeIds: [20]
            }, args.settings);

            self.concreteImage = ko.computed(function() {
                var result = null;

                var image = utilities.toJS(self.image);

                if (image && image.concreteImages && image.concreteImages.length) {
                    result = ko.utils.arrayFirst(
                        image.concreteImages,
                        isImageShown
                    );
                }

                return result;
            });

            function isImageShown(item) {
                return item.width === self.settings.imageShownWidth &&
                    item.dimensionRatio === self.settings.imageShownRatio;
            }

            self.concreteImageUrl = ko.computed(function() {
                var result = '';

                if (self.concreteImage()) {
                    result = self.concreteImage().mediaLink.href;
                }

                return result;
            });

            self.imageAlt = ko.computed(function() {
                var result = '';

                if (self.image) {
                    if (self.image()) {
                        result = self.image().alt;
                    }
                }

                return result;
            });

            if (self.settings.imageForLineups) {
                // app.on('image:imageForLineups').then(function (conceptualImage) {
                //     self.image(conceptualImage);
                // });
            }
        };

        ViewModel.prototype.selectImage = function(model, jQueryEvent) {
            var self = this;

            var params = {
                conceptualImage: self.image(),
                settings: self.settings
            };
            
            framework.showDialog('images', params).then(function(image) {
                self.image(image);
                console.log(image);
            });

            // ImagesModal.show(args).then(function (response) {
            //     if (response) {
            //         if (response.conceptualImage) {
            //             self.image(response.conceptualImage);
            //         }
            //     }
            // });
        };

        ViewModel.prototype.unselectImage = function() {
            this.image(null);
        };

        return {
            viewModel: {
                createViewModel: function(params, componentInfo) {
                    return new ViewModel(params, componentInfo);
                }
            },
            template: template
        };
    });
