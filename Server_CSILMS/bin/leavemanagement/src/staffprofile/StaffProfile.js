class StaffProfile {
    constructor(id, csiStaffId, staffName, email, icNumber, jobTitle, mobileNo, businessUnit, lineManagerId, joinDate) {
        this.id =id;
        this.csiStaffId = csiStaffId;
        this.staffName = staffName;
        this.email = email;
        this.icNumber = icNumber;
        this.jobTitle = jobTitle;
        this.mobileNo = mobileNo;
        this.businessUnit = businessUnit;
        this.lineManagerId = lineManagerId;
        this.joinDate = joinDate;
    }
}

export default StaffProfile;