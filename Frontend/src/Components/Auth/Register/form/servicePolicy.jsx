function ServicePolicy() {
    return (
        <label className="text-sm flex gap-1 items-center" htmlFor="termsNCondi"><input className="w-4 h-4 appearance-none rounded bg-[#FE6C24] checked:bg-[#FE6C24] cursor-pointer transition-colors relative checked:after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[3px] checked:after:w-[5px] checked:after:h-[9px] checked:after:border-white checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-45" type="checkbox" name="termsNCondi" id="termsNCondi" required /> I agree to the <span className="text-[#f36f11] font-semibold">Terms of Service </span>and <span className="text-[#f36f11] font-semibold">Privacy Policy</span></label>
    )
}

export default ServicePolicy