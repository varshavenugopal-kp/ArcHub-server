"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const companySchema = new mongoose_1.Schema({
    cname: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    regStatus: {
        type: Boolean,
        default: false,
        required: true
    },
    details: {
        type: Object
    },
    description: {
        type: String,
    },
    projects: {
        type: Array,
        required: true
    },
    services: {
        type: Array,
    },
    image: {
        type: String,
    },
    logo: {
        type: String
    },
    requests: {
        type: Array
    }
});
exports.companyModel = mongoose_1.default.connection.model('company', companySchema);
