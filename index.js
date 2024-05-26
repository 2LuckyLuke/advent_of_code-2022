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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function isSequenceDiffrent(a, b, c, d) {
    if (a === b || a === c || a === d || b === c || b === d || c === d) {
        return false;
    }
    return true;
}
/*---------Run code Below----------*/
const input = fs.readFileSync(path.join(__dirname, './in.txt'), { encoding: 'utf-8' });
for (let i = 0; i < input.length - 3; i++) {
    if (isSequenceDiffrent(input.charAt(i), input.charAt(i + 1), input.charAt(i + 2), input.charAt(i + 3))) {
        console.log(i + 4);
        i = input.length;
    }
}
