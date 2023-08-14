"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addlogo = exports.addImage = void 0;
const addImage = (companyRepository) => (cid, image) => __awaiter(void 0, void 0, void 0, function* () {
    const addedImage = yield companyRepository.addImage(cid, image);
    console.log("varshaaaaaa");
    return addedImage;
});
exports.addImage = addImage;
const addlogo = (companyRepository) => (cid, image) => __awaiter(void 0, void 0, void 0, function* () {
    const addedImage = yield companyRepository.addlogo(cid, image);
    console.log("varshaaaaaa");
    return addedImage;
});
exports.addlogo = addlogo;
